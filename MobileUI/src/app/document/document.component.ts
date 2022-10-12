import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../Services/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  constructor(private documentService : DocumentService) { }

  ngOnInit(): void {
    this.getDocuments()
  }

  lists : any = []

  getDocuments() {
    this.documentService.getAllDocuments().subscribe(data => {
      this.lists = data
    }, error => {
    });
  }

}
