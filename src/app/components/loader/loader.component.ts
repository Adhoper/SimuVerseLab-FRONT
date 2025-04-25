import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { LoaderService } from "../../services/loader.service";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isLoading$ | async"
     class="fixed inset-0 flex items-center justify-center z-[9999] bg-black/5"
     style="pointer-events: all">
  <div class="flex flex-col items-center pointer-events-none">
    <div class="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mb-2"></div>
    <span class="text-sm text-blue-700 font-medium">Cargando...</span>
  </div>
</div>

  `
})

export class LoaderComponent implements OnInit {
  isLoading$: any;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.isLoading$ = this.loaderService.loading$;
  }
}

  