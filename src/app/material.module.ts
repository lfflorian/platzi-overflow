import {NgModule} from '@angular/core';
import {MatMenuModule,MatToolbarModule, MatIconModule,MatCardModule, MatButtonModule, MatInputModule, MatListModule, MatGridListModule, MatRadioModule, MatProgressSpinnerModule } from '@angular/material';
const modules = [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatMenuModule
];

@NgModule({
    imports:modules,
    exports:modules
})
export class MaterialModule {}
