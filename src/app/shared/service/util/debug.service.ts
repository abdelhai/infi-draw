import { Injectable } from '@angular/core';
import { MemoryService } from '../core/memory.service';
import { Trail } from '../../model/trail.model';

@Injectable({
  providedIn: 'root'
})
export class DebugService {
  private queueList: Function[] = [];

  constructor(private memory: MemoryService) {}

  setToQueue($callback: Function): void {
    this.queueList.push($callback);
  }

  render(): void {
    const ctxDebug: CanvasRenderingContext2D = this.memory.renderer.ctx.debug;
    const c: HTMLCanvasElement = ctxDebug.canvas;
    c.width = this.memory.renderer.wrapper.clientWidth;
    c.height = this.memory.renderer.wrapper.clientHeight;

    ctxDebug.translate(0.5, 0.5);

    for (let i = 0; i < this.queueList.length; i++) {
      this.queueList[i](ctxDebug, this.memory);
    }
  }
}