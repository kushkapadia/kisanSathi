/*
Template: Hope-Ui - Responsive Bootstrap 5 Admin Dashboard Template
Author: iqonic.design
Design and Developed by: iqonic.design
NOTE: This file contains the all calender events.
*/
// "use strict"




if (document.querySelectorAll('#calendar1').length) {

    document.addEventListener('DOMContentLoaded', async function  () {
  
      let response= await fetch('/getMyApprovedRequests')
  let allRequests = await response.json()
  // console.log(allRequests)
  
  let events =[]
  events = allRequests.map((request)=>{
      let startMinutes = new Date(request.fromDate).getMinutes();
      startMinutes = startMinutes <= 9 ? '0' + startMinutes : startMinutes
  
      let startHours = new Date(request.fromDate).getHours();
      startHours = startHours <= 9 ? '0' + startHours : startHours
  
      let endMinutes = new Date(request.toDate).getMinutes();
      endMinutes = endMinutes <= 9 ? '0' + endMinutes : endMinutes
  
      let endHours = new Date(request.toDate).getHours();
      endHours = endHours <= 9 ? '0' + endHours : endHours
  let bgColor = null
  let borderColor = null
  let txtColor = null
    //   if(request.status == "tentative"){
    //     bgColor = "rgba(58,87,232,0.2)"
    //   } else if(request.status == "confirmed"){
    //     bgColor = "rgb(86, 237, 48, 0.8)"
    //     txtColor= "$fff"
    //     borderColor= "#186a01"
    //   } else if(request.status == "hounored"){
    //     bgColor = "rgb(86, 237, 48, 0.8)"
    //     txtColor="$fff"
    //     borderColor= "#186a01"
    //   }
  
      return  {
        title: request.itemName,
        // url: `viewrequest/${request._id}/${request.contactId}`,
        description: "Helo",
        start: moment(new Date(request.fromDate), 'YYYY-MM-DD').format('YYYY-MM-DD') + `T${startHours + ":" + startMinutes}:00.000Z`,
        end: moment(new Date(request.toDate), 'YYYY-MM-DD').format('YYYY-MM-DD') + `T${endHours + ":" + endMinutes}:00.000Z`,
        
        backgroundColor: 'rgba(58,87,232,0.2)',
        // backgroundColor: bgColor,
        textColor: 'rgba(58,87,232,1)',
        // textColor: txtColor,
        borderColor: 'rgba(58,87,232,1)'
        // borderColor: borderColor
  }
  })
  
  // console.log(events)
      let calendarEl = document.getElementById('calendar1');
      let calendar1 = new FullCalendar.Calendar(calendarEl, {
        selectable: true,
        plugins: ["timeGrid", "dayGrid", "list", "interaction"],
        timeZone: "IST",
        weekNumberCalculation: "ISO",
        defaultView: "dayGridMonth",
        contentHeight: "auto",
      //   eventLimit: true,
      //   dayMaxEvents: 4,
        header: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
        },
        dateClick: function (info) {
            $('#schedule-start-date').val(info.dateStr)
            $('#schedule-end-date').val(info.dateStr)
            $('#date-event').modal('show')
        },
        events: events
    });
    calendar1.render();
    });
    
  }