/**
 * STEMp Hardware Abstraction Layer
 * Provides honest, transparent device adapters:
 * - DemoDeviceAdapter: First-class simulation for testing without physical kit
 * - WebSerialDeviceAdapter: Real USB-C serial port communication via Web Serial API
 */

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface DeviceState {
  name: string;
  isDemo: boolean;
  status: ConnectionStatus;
  errorMessage: string | null;
  baudRate?: number;
  portInfo?: string;
}

export interface HardwareAdapter {
  getState: () => DeviceState;
  connect: () => Promise<boolean>;
  disconnect: () => void;
  sendCommand: (command: string) => Promise<boolean>;
  onStateChange: (listener: (state: DeviceState) => void) => () => void;
  onData: (listener: (data: string) => void) => () => void;
}

/**
 * DemoDeviceAdapter
 * First-class simulation adapter with honest labeling ("Mode Demo").
 * Does NOT fabricate firmware versions or fake battery percentages.
 */
export class DemoDeviceAdapter implements HardwareAdapter {
  private state: DeviceState = {
    name: 'Demo Core',
    isDemo: true,
    status: 'disconnected',
    errorMessage: null,
  };

  private stateListeners: Set<(state: DeviceState) => void> = new Set();
  private dataListeners: Set<(data: string) => void> = new Set();

  getState(): DeviceState {
    return { ...this.state };
  }

  private updateState(partial: Partial<DeviceState>) {
    this.state = { ...this.state, ...partial };
    this.stateListeners.forEach((fn) => fn(this.getState()));
  }

  async connect(): Promise<boolean> {
    this.updateState({ status: 'connecting', errorMessage: null });
    // Realistic short delay for connection handshake
    await new Promise((r) => setTimeout(r, 600));
    this.updateState({
      status: 'connected',
      errorMessage: null,
      portInfo: 'Simulasi Perangkat Virtual',
    });
    return true;
  }

  disconnect(): void {
    this.updateState({
      status: 'disconnected',
      errorMessage: null,
      portInfo: undefined,
    });
  }

  async sendCommand(command: string): Promise<boolean> {
    if (this.state.status !== 'connected') return false;
    this.dataListeners.forEach((fn) => fn(`[DEMO ACK] ${command}`));
    return true;
  }

  onStateChange(listener: (state: DeviceState) => void): () => void {
    this.stateListeners.add(listener);
    listener(this.getState());
    return () => this.stateListeners.delete(listener);
  }

  onData(listener: (data: string) => void): () => void {
    this.dataListeners.add(listener);
    return () => this.dataListeners.delete(listener);
  }
}

/**
 * WebSerialDeviceAdapter
 * Real physical hardware connection via Chrome / Edge Web Serial API.
 */
export class WebSerialDeviceAdapter implements HardwareAdapter {
  private state: DeviceState = {
    name: 'STEMp Core (USB-C)',
    isDemo: false,
    status: 'disconnected',
    errorMessage: null,
  };

  private port: any = null;
  private reader: any = null;
  private writer: any = null;
  private stateListeners: Set<(state: DeviceState) => void> = new Set();
  private dataListeners: Set<(data: string) => void> = new Set();

  getState(): DeviceState {
    return { ...this.state };
  }

  private updateState(partial: Partial<DeviceState>) {
    this.state = { ...this.state, ...partial };
    this.stateListeners.forEach((fn) => fn(this.getState()));
  }

  isSupported(): boolean {
    return typeof navigator !== 'undefined' && 'serial' in navigator;
  }

  async connect(): Promise<boolean> {
    if (!this.isSupported()) {
      this.updateState({
        status: 'error',
        errorMessage:
          'Browser ini belum mendukung koneksi STEMp Core langsung. Silakan gunakan Google Chrome atau Microsoft Edge di laptop.',
      });
      return false;
    }

    try {
      this.updateState({ status: 'connecting', errorMessage: null });
      // Request serial port from user device picker
      const navSerial = (navigator as any).serial;
      this.port = await navSerial.requestPort();
      await this.port.open({ baudRate: 115200 });

      this.updateState({
        status: 'connected',
        errorMessage: null,
        portInfo: 'Terhubung melalui port USB',
      });

      this.listenToStream();
      return true;
    } catch (err: any) {
      if (err.name === 'NotFoundError') {
        this.updateState({
          status: 'disconnected',
          errorMessage: 'Pemilihan perangkat dibatalkan.',
        });
      } else {
        this.updateState({
          status: 'error',
          errorMessage:
            'Gagal membuka port STEMp Core. Pastikan kabel USB-C terpasang kencang dan tidak sedang dibuka oleh aplikasi lain.',
        });
      }
      return false;
    }
  }

  private async listenToStream() {
    if (!this.port || !this.port.readable) return;
    try {
      const textDecoder = new TextDecoderStream();
      this.port.readable.pipeTo(textDecoder.writable);
      this.reader = textDecoder.readable.getReader();

      while (true) {
        const { value, done } = await this.reader.read();
        if (done) break;
        if (value) {
          this.dataListeners.forEach((fn) => fn(value));
        }
      }
    } catch {
      // Stream closed or device unplugged
      this.disconnect();
    }
  }

  async sendCommand(command: string): Promise<boolean> {
    if (!this.port || !this.port.writable || this.state.status !== 'connected') {
      return false;
    }
    try {
      const encoder = new TextEncoder();
      const writer = this.port.writable.getWriter();
      await writer.write(encoder.encode(command + '\n'));
      writer.releaseLock();
      return true;
    } catch (err) {
      return false;
    }
  }

  disconnect(): void {
    try {
      if (this.reader) {
        this.reader.cancel();
        this.reader = null;
      }
      if (this.port) {
        this.port.close();
        this.port = null;
      }
    } catch {}

    this.updateState({
      status: 'disconnected',
      errorMessage: null,
      portInfo: undefined,
    });
  }

  onStateChange(listener: (state: DeviceState) => void): () => void {
    this.stateListeners.add(listener);
    listener(this.getState());
    return () => this.stateListeners.delete(listener);
  }

  onData(listener: (data: string) => void): () => void {
    this.dataListeners.add(listener);
    return () => this.dataListeners.delete(listener);
  }
}
