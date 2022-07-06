import { Component, Input, OnInit } from '@angular/core'; 
  
  @Component({
    selector: 'trainee-app',
    templateUrl: './trainee.component.html',
    styleUrls: ['./trainee.component.css']
  })

export class TraineeComponent implements OnInit {

    @Input() controls = true;
    autoSlide = true;
    @Input() slideInterval = 5000;
    @Input() showmsg = false;
    inss = "Выберите чтобы раскрыть подробнее информацию";
  
    selectedIndex = 0;
  
    ngOnInit(): void {
      if(this.autoSlide){
        this.autoSlideImages();
      }
    }
  
    autoSlideImages(): void {
      setInterval(() =>{
        this.onNextClick();
      }, this.slideInterval);
    }
  
    selecImage(index: number): void{
      this.selectedIndex = index;
    }
  
    onPrevClick(): void {
      if(this.selectedIndex === 0){
        this.selectedIndex = this.images.length - 1;
      } else {
        this.selectedIndex--;
      }
    }
  
    onNextClick(): void {
      if(this.selectedIndex === this.images.length - 1){  
        this.selectedIndex = 0;
      } else {
        this.selectedIndex++;
      }
    }
  
    showmessage(index){
      this.inss = this.ins[index]
    }
  
    ins = ["C# — объектно-ориентированный язык программирования. Разработан в 1998—2001 годах группой инженеров компании Microsoft под руководством Андерса Хейлсберга и Скотта Вильтаумота как язык разработки приложений для платформы Microsoft .NET Framework.",
           "JavaScript — мультипарадигменный язык программирования. Поддерживает объектно-ориентированный, императивный и функциональный стили. Является реализацией спецификации ECMAScript. JavaScript обычно используется как встраиваемый язык для программного доступа к объектам приложений.",  
           "TypeScript — язык программирования, представленный Microsoft в 2012 году и позиционируемый как средство разработки веб-приложений, расширяющее возможности JavaScript.",  
           "Swift — открытый мультипарадигмальный компилируемый язык программирования общего назначения, разработанный и поддерживаемый компанией Apple.",
           "Java — строго типизированный объектно-ориентированный язык программирования общего назначения, разработанный компанией Sun Microsystems.",
           "Kotlin — статически типизированный, объектно-ориентированный язык программирования, работающий поверх Java Virtual Machine и разрабатываемый компанией JetBrains. Также компилируется в JavaScript и в исполняемый код ряда платформ через инфраструктуру LLVM.",
           ".NET — это модульная платформа для разработки программного обеспечения с открытым исходным кодом. Совместима с такими операционными системами как Windows, Linux и macOS. Была выпущена компанией Microsoft. У платформы есть собственное сообщество на GitHub.",
           "SQL — декларативный язык программирования, применяемый для создания, модификации и управления данными в реляционной базе данных, управляемой соответствующей системой управления базами данных."
    ]

    images = [
        {
          imageSrc:
            'assets/images/trainee/back.svg',
          imageAlt: 'backend developer',
          url: 'https://rabota.ykt.ru/jobs/view?id=2837051'
        },
        {
          imageSrc:
            'assets/images/trainee/front.svg',
          imageAlt: 'frontend developer',
          url: 'https://rabota.ykt.ru/jobs/view?id=2916297'
        },
        {
          imageSrc:
            'assets/images/trainee/test.svg',
          imageAlt: 'Test',
          url: 'https://rabota.ykt.ru/jobs/view?id=2557741'
        },
      ]
}