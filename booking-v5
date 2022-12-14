$( document ).ready(function() {
    console.log( "ready!" );

    let bookedTimeArr = []
    const date = new Date()
    const dayInWeek = [
    	"Chủ nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7"
    ]
    
    var monthYearNode = document.getElementById("month-year")
    // Now date as default
    monthYearNode.innerHTML =
    	`Tháng ${date.getMonth() + 1}/${date.getFullYear()}`
    
    var monthYearFormatted = monthYearNode.innerHTML.replace("Tháng ","")
		var month = monthYearFormatted.substr(0,2)
    var year = monthYearFormatted.substr(3,5)
    
    var dateMonthYear = document.getElementById("date-month-year")
    const currentDate = new Date(`${month}/${date.getDate()}/${year}`)
    // Now date as default
    dateMonthYear.innerHTML =
    	`${dayInWeek[currentDate.getDay()]}, ${date.getDate()}/${month}/${year}`
		
    generateDateByMonth(month, year)
    generateTime()
		countSlot()
    
    var nextMonth = document.getElementById("next-month-btn")
    var prevMonth = document.getElementById("prev-month-btn")

    nextMonth.onclick = function () {
    	var monthYearNode = document.getElementById("month-year")

      var monthYearFormatted = monthYearNode.innerHTML.replace("Tháng ","")
      var month = monthYearFormatted.substr(0,2)
      var year = monthYearFormatted.substr(3,5)

      removeDate()
      inactiveAllTime()
      if (+month == 12) {
      	month = 1
        year = +year + 1
        monthYearNode.innerHTML =
		    	`Tháng 0${month}/${year}`
        generateDateByMonth(month, year)
      } else {
      	month = +month + 1
        monthYearNode.innerHTML =
		    	`Tháng ${month >= 10 ? month : `0${month}`}/${year}`
        generateDateByMonth(month, year)
      }
    }

    prevMonth.onclick = function () {
    	var monthYearNode = document.getElementById("month-year")
      var monthYearFormatted = monthYearNode.innerHTML.replace("Tháng ","")
      var month = monthYearFormatted.substr(0,2)
      var year = monthYearFormatted.substr(3,5)
      removeDate()
      inactiveAllTime()
      if (+month == 1) {
      	month = 12
        year = +year - 1
        monthYearNode.innerHTML =
		    	`Tháng ${month}/${year}`
        generateDateByMonth(month, year)
      } else {
      	month = +month - 1
        monthYearNode.innerHTML =
		    	`Tháng ${month >= 10 ? month : `0${month}`}/${year}`
        generateDateByMonth(month, year)
      }
    }
    function inactiveRestItems(arrayItems, mainItem) {
      restItems = arrayItems.filter(restItem => restItem.firstChild.data != mainItem.firstChild.data)
      restItems.map(ri => {
      	const value = ri.firstChild.data
      	var itemInput = document.getElementById(`date-item-checkbox-${value}`)
        itemInput.checked = false
        if (itemInput.hasAttribute("name")) {
        	itemInput.removeAttribute("name")
        }
        ri.classList.remove("checked-date");
      })
    }
    function inactiveRestTimeItems(arrayItems, mainItem) {
    	restItems = arrayItems.filter(restItem => restItem.innerText != mainItem.innerText)
      restItems.map(ri => {
      	const value = ri.innerText
      	var itemInput = document.getElementById(`time-item-checkbox-${value}`)
        itemInput.checked = false
        if (itemInput.hasAttribute("name")) {
        	itemInput.removeAttribute("name")
        }
        ri.classList.remove("checked");
      })
    }
    function activeItem(item) {
      item.classList.add("checked-date");
    }
    function activeTimeItem(item) {
    	item.classList.add("checked");
    }
    function inactiveItem(item, itemInput) {
      item.classList.remove("checked-date");
      itemInput.checked = false
      itemInput.removeAttribute("name")
    }
    function removeDate() {
    	 var dateItems = document.querySelectorAll(".date-container")
       dateItems.forEach(item => {
         item.remove()
       })
    }    
    function inactiveAllTime() {
    	var bookTimeElements = document.querySelectorAll(".book-time")
      bookTimeElements.forEach(item => {
        var itemInput = document.getElementById(`time-item-checkbox-${item.innerText}`)
        itemInput.checked = false
        if (itemInput.hasAttribute("name")) {
        	itemInput.removeAttribute("name")
        }
        item.classList.remove("checked");
      })
    }
    function generateTime() {
      const timeConfig = ["9:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"]
      timeConfig.map(config => {
        var timeConfigContainer = document.getElementById("time-config-container")
        var bookTimeEle = document.createElement("div")
        bookTimeEle.className = "book-time"
        var input = document.createElement("INPUT")
        input.setAttribute("type", "checkbox")
        input.id = `time-item-checkbox-${config}`
        bookTimeEle.appendChild(input)
        input.style.display = "none"
        var label = document.createElement("LABEL")
        label.htmlFor = input.id
        label.className = "time-label"
        bookTimeEle.appendChild(label)
        var timeItems = document.createElement("div")
        timeItems.className = "time-items"
        timeItems.innerText = config
        label.appendChild(timeItems)
        timeConfigContainer.appendChild(bookTimeEle)
      })
      // Time to book
      var timeArr = []
      var bookTimeElements = document.querySelectorAll(".book-time")
      bookTimeElements.forEach(item => {
        timeArr.push(item)
      })
      timeArr.map(item => {
        item.onclick = function() {
          var isDisabled = item.className.includes("disable")
          var itemInput = document.getElementById(`time-item-checkbox-${item.innerText}`)
          if (!isDisabled) {
          	itemInput.checked = true
            itemInput.name = `Thời gian: ${item.innerText}`
            activeTimeItem(item)
            // Inactive another selected item
            inactiveRestTimeItems(timeArr, item)
          }
        }
      })
    }
    function generateDateByMonth(newMonth, newYear) {
      const theFirstDateOfMonth = new Date(`${newMonth}/${1}/${newYear}`)
      const indexDate = theFirstDateOfMonth.getDay()
      var numberDatesOfMonth = new Date(newYear, newMonth, 0).getDate()
      var dates = Array(numberDatesOfMonth).fill().map((x,i)=>i)

      for (let i = 1; i <= indexDate; i++) {
        var calendarContainer = document.getElementById("calendar-container")
        var dateContainerEle = document.createElement("div")
        dateContainerEle.className = "date-container"
        calendarContainer.appendChild(dateContainerEle)
      }
      dates.map(date => {
        var calendarContainer = document.getElementById("calendar-container")
        var dateContainerEle = document.createElement("div")
        dateContainerEle.className = "date-container"

        var input = document.createElement("INPUT")
        input.setAttribute("type", "checkbox")
        input.id = `date-item-checkbox-${date + 1}`
        //input.name = "Ngày khác"
        dateContainerEle.appendChild(input)
        input.style.display = "none"

        var label = document.createElement("LABEL")
        label.htmlFor = input.id
        dateContainerEle.appendChild(label)

        var dateItems = document.createElement("div")
        dateItems.className = "date-items"
        dateItems.innerText = date + 1
        label.appendChild(dateItems)
        calendarContainer.appendChild(dateContainerEle)
      })
      // Date to book
      var dateArr = []
      var dateItems = document.querySelectorAll(".date-items")
      dateItems.forEach(item => {
        if (item.firstChild.data == date.getDate()) {
          item.classList.add("current");
          item.classList.add("checked-date");

          var itemInput = document.getElementById(`date-item-checkbox-${item.firstChild.data}`)
          itemInput.name = `Ngày ${item.firstChild.data} Tháng ${newMonth} Năm ${newYear}`
          itemInput.checked = true
        }
        dateArr.push(item)
      })

      dateArr.map(item => {
        const value = item.firstChild.data
        var itemInput = document.getElementById(`date-item-checkbox-${value}`)

        item.onclick = function() {
          if (!itemInput.checked) {
          	itemInput.name = `Ngày ${item.firstChild.data} Tháng ${newMonth} Năm ${newYear}`
            activeItem(item)
            const dateSelected =
                  new Date(`${newMonth}/${item.firstChild.data}/${newYear}`)
            dateMonthYear.innerHTML =
              `${dayInWeek[dateSelected.getDay()]}, ${item.firstChild.data}/${newMonth}/${newYear}`
            // Inactive another selected item
            inactiveRestItems(dateArr, item)
          }
        }
      })
    }
  // Query data from sheet
  function countSlot() {
    const sheetId = "175uTXxkU74a-hlhLXG2r-P7bnemsgjOS19HPu4BHTvE"
    const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`
    const sheetName = "Booking"
    let qu = "select * where D>=date'2022-12-01'"
    const query = encodeURIComponent(qu)
    const url = `${base}&sheet=${sheetName}&tq=${query}`
    let data = []
    fetch(url)
      .then(res => res.text())
      .then(rep => {
      const jsData = JSON.parse(rep.substr(47).slice(0, -2))
      const colz = []
      jsData.table.cols.forEach(heading => {
        if (heading.label) {
          const label = heading.label.toLowerCase().replace(/\s/g, "")
          const normalizeLabel = label.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          colz.push(normalizeLabel)
        }
      })
      jsData.table.rows.forEach(main => {
        let row = {}
        colz.forEach((ele, index) => {
          row[ele] = (main.c[index] != null ? main.c[index].v : "")
        })
        data.push(row)
      })
    })

    console.log('data: ', data);
    data.forEach(item => {
      console.log("item", item)
    })
    
    let originString = "Date(1899,11,30,10,0,0)"
    let stringSplited = originString.replace("Date(", "")
    stringSplited = stringSplited.replace(")", "")
    var timeItems = []
    let numberString = ""
    for(let i = 0; i < stringSplited.length; i++) {
      let character = stringSplited.charAt(i)
      if (character != ",") {
        numberString += character
        if (i == stringSplited.length - 1) {
          timeItems.push(numberString)
          numberString = ""
        }
      } else {
        timeItems.push(numberString)
        numberString = ""
      }
    }

    bookedTimeArr = data
    console.log('bookedTime: ', bookedTimeArr);
    var timeItemsDate = new Date(+timeItems[0], +timeItems[1], +timeItems[2], +timeItems[3], +timeItems[4], +timeItems[5])
    const bookedTime = `${timeItemsDate.getHours()}:${timeItemsDate.getMinutes()}`
    console.log("booked time", bookedTime)
  }
});
