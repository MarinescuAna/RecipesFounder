import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepInstructionModule } from './step-instruction.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class InstructionModule { 
    name:string;
  steps:StepInstructionModule[];
}
