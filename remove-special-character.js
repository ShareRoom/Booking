$(document).ready(function () {
  console.log("ready!");

  const date = new Date();
  const dayInWeek = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  const timeConfig = [
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
  ];

  var dateInput = document.getElementById("date-input");
  var timeInput = document.getElementById("time-input");

  var monthYearNode = document.getElementById("month-year");
  // Now date as default
  monthYearNode.innerHTML = `Tháng ${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  var monthYearFormatted = monthYearNode.innerHTML.replace("Tháng ", "");
  var month = monthYearFormatted.substr(0, 2);
  var year = monthYearFormatted.substr(3, 5);

  dateInput.value = `${year}-${month}-${date.getDate()}`;
  timeInput.value = "9:00";

  var dateMonthYear = document.getElementById("date-month-year");
  const currentDate = new Date(`${month}/${date.getDate()}/${year}`);
  // Now date as default
  dateMonthYear.innerHTML = `${
    dayInWeek[currentDate.getDay()]
  }, ${date.getDate()}/${month}/${year}`;

  generateDateByMonth(month, year);
  generateTime(date.getDate(), month, year);
  getBookedItems(date.getDate(), month, year);

  var nextMonth = document.getElementById("next-month-btn");
  var prevMonth = document.getElementById("prev-month-btn");
  var prevMonthLinkBlock = document.getElementById("link-block-previous");
  prevMonthLinkBlock.classList.add("passed");

  nextMonth.onclick = function () {
    prevMonthLinkBlock.classList.remove("passed");
    var monthYearNode = document.getElementById("month-year");

    var monthYearFormatted = monthYearNode.innerHTML.replace("Tháng ", "");
    var month = monthYearFormatted.substr(0, 2);
    var year = monthYearFormatted.substr(3, 5);

    removeDate();
    inactiveAllTime();
    if (+month == 12) {
      month = 1;
      year = +year + 1;
      monthYearNode.innerHTML = `Tháng 0${month}/${year}`;
      generateDateByMonth(month, year);
    } else {
      month = +month + 1;
      monthYearNode.innerHTML = `Tháng ${
        month >= 10 ? month : `0${month}`
      }/${year}`;
      generateDateByMonth(month, year);
    }
  };

  prevMonth.onclick = function () {
    var isDisabled = prevMonthLinkBlock.className.includes("passed");

    if (!isDisabled) {
      var monthYearNode = document.getElementById("month-year");
      var monthYearFormatted = monthYearNode.innerHTML.replace("Tháng ", "");
      var month = monthYearFormatted.substr(0, 2);
      var year = monthYearFormatted.substr(3, 5);
      removeDate();
      inactiveAllTime();
      if (+month == 1) {
        month = 12;
        year = +year - 1;
        monthYearNode.innerHTML = `Tháng ${month}/${year}`;
        generateDateByMonth(month, year);
      } else {
        month = +month - 1;
        monthYearNode.innerHTML = `Tháng ${
          month >= 10 ? month : `0${month}`
        }/${year}`;
        generateDateByMonth(month, year);
      }

      const currentDate = new Date();
      if (
        month == currentDate.getMonth() + 1 &&
        year == currentDate.getFullYear()
      ) {
        prevMonthLinkBlock.classList.add("passed");
      }
    }
  };
  function inactiveRestItems(arrayItems, mainItem) {
    restItems = arrayItems.filter(
      (restItem) => restItem.firstChild.data != mainItem.firstChild.data
    );
    restItems.map((ri) => {
      const value = ri.firstChild.data;
      var itemInput = document.getElementById(`date-item-checkbox-${value}`);
      itemInput.checked = false;
      if (itemInput.hasAttribute("name")) {
        itemInput.removeAttribute("name");
      }
      ri.classList.remove("checked-date");
    });
  }
  function inactiveRestTimeItems(arrayItems, mainItem) {
    restItems = arrayItems.filter(
      (restItem) => restItem.innerText != mainItem.innerText
    );
    restItems.map((ri, index) => {
      const value = timeConfig[index];
      var itemInput = document.getElementById(`time-item-checkbox-${value}`);
      itemInput.checked = false;
      if (itemInput.hasAttribute("name")) {
        itemInput.removeAttribute("name");
      }
      ri.classList.remove("checked");
    });
  }
  function activeItem(item) {
    item.classList.add("checked-date");
  }
  function activeTimeItem(item) {
    item.classList.add("checked");
  }
  function inactiveItem(item, itemInput) {
    item.classList.remove("checked-date");
    itemInput.checked = false;
    itemInput.removeAttribute("name");
  }
  function removeDate() {
    var dateItems = document.querySelectorAll(".date-container");
    dateItems.forEach((item) => {
      item.remove();
    });
  }
  function removeTime() {
    var dateItems = document.querySelectorAll(".book-time");
    dateItems.forEach((item) => {
      item.remove();
    });
  }
  function inactiveAllTime() {
    var bookTimeElements = document.querySelectorAll(".book-time");
    console.log('bookTimeElements: ', bookTimeElements);
    bookTimeElements.forEach((item, index) => {
      // console.log('item: ', item);
      console.log("item.innerText", item.innerText);
      console.log("HIHIhihi",item.innerText.replace(/[^a-zA-Z ]/g, ""));
      console.log("timeConfig[index]", timeConfig[index]);
      var itemInput = document.getElementById(
        `time-item-checkbox-${timeConfig[index]}`
      );
      itemInput.checked = false;
      if (itemInput.hasAttribute("name")) {
        itemInput.removeAttribute("name");
      }
      item.classList.remove("checked");
    });
  }
  function generateTime(newDate, newMonth, newYear) {
    // Comment to disable
    const dateFormat = new Date(`${newMonth}/${newDate}/${newYear}`);
    const indexDate = dateFormat.getDay();

    timeConfig.map((config) => {
      var timeConfigContainer = document.getElementById(
        "time-config-container"
      );
      var bookTimeEle = document.createElement("div");
      bookTimeEle.className = "book-time";

      if (
        indexDate >= 1 &&
        indexDate <= 5 &&
        (config == timeConfig[10] ||
          config == timeConfig[11] ||
          config == timeConfig[12] ||
          config == timeConfig[13] ||
          config == timeConfig[14] ||
          config == timeConfig[15] ||
          config == timeConfig[16])
      ) {
        bookTimeEle.classList.add("disable");
      }

      var input = document.createElement("INPUT");
      input.setAttribute("type", "checkbox");
      input.id = `time-item-checkbox-${config}`;
      bookTimeEle.appendChild(input);
      input.style.display = "none";
      var label = document.createElement("LABEL");
      label.htmlFor = input.id;
      label.className = "time-label";
      bookTimeEle.appendChild(label);
      var timeItems = document.createElement("div");
      timeItems.className = "time-items";
      timeItems.innerText = config;
      label.appendChild(timeItems);
      timeConfigContainer.appendChild(bookTimeEle);
    });
    // Time to book
    var timeArr = [];
    var bookTimeElements = document.querySelectorAll(".book-time");
    bookTimeElements.forEach((item) => {
      timeArr.push(item);
    });
    timeArr.map((item, index) => {
      item.onclick = function () {
        var isDisabled = item.className.includes("disable");
        var itemInput = document.getElementById(
          `time-item-checkbox-${timeConfig[index]}`
        );
        if (!isDisabled) {
          timeInput.value = timeConfig[index];
          itemInput.checked = true;
          // itemInput.name = `Thời gian: ${item.innerText}`;
          activeTimeItem(item);
          // Inactive another selected item
          inactiveRestTimeItems(timeArr, item);
        }
      };
    });
  }
  function generateDateByMonth(newMonth, newYear) {
    const theFirstDateOfMonth = new Date(`${newMonth}/${1}/${newYear}`);
    const indexDate = theFirstDateOfMonth.getDay();
    // Get total date of month
    var numberDatesOfMonth = new Date(newYear, newMonth, 0).getDate();
    var dates = Array(numberDatesOfMonth)
      .fill()
      .map((x, i) => i);

    for (let i = 1; i <= indexDate; i++) {
      var calendarContainer = document.getElementById("calendar-container");
      var dateContainerEle = document.createElement("div");
      dateContainerEle.className = "date-container";
      calendarContainer.appendChild(dateContainerEle);
    }
    dates.map((date) => {
      var calendarContainer = document.getElementById("calendar-container");
      var dateContainerEle = document.createElement("div");
      dateContainerEle.className = "date-container";

      var input = document.createElement("INPUT");
      input.setAttribute("type", "checkbox");
      input.id = `date-item-checkbox-${date + 1}`;
      //input.name = "Ngày khác"
      dateContainerEle.appendChild(input);
      input.style.display = "none";

      var label = document.createElement("LABEL");
      label.htmlFor = input.id;
      dateContainerEle.appendChild(label);

      var dateItems = document.createElement("div");
      dateItems.innerText = date + 1;
      label.appendChild(dateItems);

      const currentDate = new Date();
      dateItems.className =
        date + 1 < currentDate.getDate() &&
        newMonth == currentDate.getMonth() + 1 &&
        newYear == currentDate.getFullYear()
          ? "date-items-passed"
          : "date-items";

      calendarContainer.appendChild(dateContainerEle);
    });
    // Date to book
    var dateArr = [];
    var dateItems = document.querySelectorAll(".date-items");
    dateItems.forEach((item) => {
      if (item.firstChild.data == date.getDate()) {
        dateInput.value = `${newYear}-${newMonth}-${item.firstChild.data}`;
        item.classList.add("current");
        item.classList.add("checked-date");

        var itemInput = document.getElementById(
          `date-item-checkbox-${item.firstChild.data}`
        );
        // itemInput.name = `Ngày ${item.firstChild.data} Tháng ${newMonth} Năm ${newYear}`;
        itemInput.checked = true;
      }
      dateArr.push(item);
    });

    dateArr.map((item) => {
      const value = item.firstChild.data;
      var itemInput = document.getElementById(`date-item-checkbox-${value}`);

      item.onclick = function () {
        const currentDate = new Date();
        if (
          !(
            item.firstChild.data < currentDate.getDate() &&
            newMonth == currentDate.getMonth() + 1 &&
            newYear == currentDate.getFullYear()
          )
        ) {
          if (!itemInput.checked) {
            dateInput.value = `${newYear}-${newMonth}-${item.firstChild.data}`;

            var bookTimeElements = document.querySelectorAll(".book-time");
            bookTimeElements.forEach((item) => {
              item.classList.remove("disable");
              item.classList.remove("checked");
            });
            getBookedItems(item.firstChild.data, newMonth, newYear);
            removeTime();
            generateTime(item.firstChild.data, newMonth, newYear);

            // itemInput.name = `Ngày ${item.firstChild.data} Tháng ${newMonth} Năm ${newYear}`;
            activeItem(item);
            const dateSelected = new Date(
              `${newMonth}/${item.firstChild.data}/${newYear}`
            );
            dateMonthYear.innerHTML = `${dayInWeek[dateSelected.getDay()]}, ${
              item.firstChild.data
            }/${newMonth}/${newYear}`;
            // Inactive another selected item
            inactiveRestItems(dateArr, item);
          }
        }
      };
    });
  }
  // Query data from sheet
  function getBookedItems(date, month, year) {
    const sheetId = "14ndSN2OnqGT5cLQpOmPynqmHhHL2PgHNCMYCk83QIbQ";
    const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
    const sheetName = "Booking";
    let qu = "select * where D=date" + `'${year}-${month}-${date}'`;
    const query = encodeURIComponent(qu);
    const url = `${base}&sheet=${sheetName}&tq=${query}`;
    let data = [];
    fetch(url)
      .then((res) => res.text())
      .then((rep) => {
        const jsData = JSON.parse(rep.substr(47).slice(0, -2));
        const colz = [];
        jsData.table.cols.forEach((heading) => {
          if (heading.label) {
            const label = heading.label.toLowerCase().replace(/\s/g, "");
            const normalizeLabel = label
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "");
            colz.push(normalizeLabel);
          }
        });
        jsData.table.rows.forEach((main) => {
          let row = {};
          colz.forEach((ele, index) => {
            row[ele] = main.c[index] != null ? main.c[index].v : undefined;
          });
          data.push(row);
        });

        var bookTimeElements = document.querySelectorAll(".book-time");
        bookTimeElements.forEach((ele) => {
          let eleFlag = 0;

          for (let i = 0; i < data.length; i++) {
            let originString = data[i].giođen;
            let stringSplited = originString.replace("Date(", "");
            stringSplited = stringSplited.replace(")", "");
            var timeItems = [];
            let numberString = "";
            for (let i = 0; i < stringSplited.length; i++) {
              let character = stringSplited.charAt(i);
              if (character != ",") {
                numberString += character;
                if (i == stringSplited.length - 1) {
                  timeItems.push(numberString);
                  numberString = "";
                }
              } else {
                timeItems.push(numberString);
                numberString = "";
              }
            }

            var timeItemsDate = new Date(
              +timeItems[0],
              +timeItems[1],
              +timeItems[2],
              +timeItems[3],
              +timeItems[4],
              +timeItems[5]
            );
            const bookedTime = `${timeItemsDate.getHours()}:${timeItemsDate.getMinutes()}`;

            let hour = bookedTime.substr(0, 2);
            hour = hour.replace(":", "");
            let minute = bookedTime.substr(2, 4);
            minute = minute.replace(":", "");
            minute = +minute >= 10 ? minute : `0${minute}`;

            let bookedTimeFormatted = `${hour}:${minute}`;

            if (bookedTimeFormatted == ele.innerText) {
              eleFlag += 1;
              if (eleFlag == 2) {
                ele.classList.add("disable");
                break;
              }
            }
          }
        });
      });
  }
});
