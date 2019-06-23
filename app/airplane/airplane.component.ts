import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { AirplaneService } from '../airplane.service';  
import { Airplane } from '../airplane';

@Component({
  selector: 'app-airplane',
  templateUrl: './airplane.component.html',
  styleUrls: ['./airplane.component.css']
})
export class AirplaneComponent implements OnInit {
  dataSaved = false;  
  airplaneForm: any;  
  allAirplanes: Observable<Airplane[]>;  
  airplaneIdUpdate = null;  
  massage = null; 

  constructor(private formbulider: FormBuilder, private airplaneService:AirplaneService) { }

  ngOnInit() 
  {
    this.airplaneForm = this.formbulider.group(
      {
        CodigoAviao: ['', [Validators.required]],
        Modelo: ['', [Validators.required]],
        Passageiros: ['', [Validators.required]],
      }
    );
    this.loadAllAirplanes();
  }
  loadAllAirplanes()
  { this.allAirplanes = this.airplaneService.GetAirplane()}

  onFormSubmit() {  
    this.dataSaved = false;  
    const airplane = this.airplaneForm.value;  
    this.CreateAirplane(airplane);  
    this.airplaneForm.reset();  
  }  
  loadAirplaneToEdit(airplaneId: bigint) {  
    this.airplaneService.GetAirplaneByID(airplaneId).subscribe(airplane=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.airplaneIdUpdate = airplane.Airplane_ID;  
      this.airplaneForm.controls['CodigoAviao'].setValue(airplane.CodigoAviao);  
      this.airplaneForm.controls['Modelo'].setValue(airplane.Modelo);  
      this.airplaneForm.controls['Passageiros'].setValue(airplane.Passageiros);       
    }); 
  } 
  CreateAirplane(airplane: Airplane) 
    {  
      if (this.airplaneIdUpdate == null) 
      {  
        this.airplaneService.createAirplane(airplane).subscribe(  
          () => {  
            this.dataSaved = true;  
            this.massage = 'Record saved Successfully';  
            this.loadAllAirplanes();  
            this.airplaneIdUpdate = null;  
            this.airplaneForm.reset();  
          }  
        );  
      } else 
      {  
        airplane.Airplane_ID = this.airplaneIdUpdate;  
        this.airplaneService.updateAirplane(airplane).subscribe(() => 
        {  
          this.dataSaved = true;  
          this.massage = 'Record Updated Successfully';  
          this.loadAllAirplanes();  
          this.airplaneIdUpdate = null;  
          this.airplaneForm.reset();  
        });  
      }  
    }

    deleteAirplane(airplaneId: bigint) {  
      if (confirm("Are you sure you want to delete this ?")) {   
      this.airplaneService.deleteAirplaneById(airplaneId).subscribe(() => {  
        this.dataSaved = true;  
        this.massage = 'Record Deleted Succefully';  
        this.loadAllAirplanes();  
        this.airplaneIdUpdate = null;  
        this.airplaneForm.reset();  
    
      });  
    }
  
  }
  resetForm() {  
    this.airplaneForm.reset();  
    this.massage = null;  
    this.dataSaved = false;  
  }
}
