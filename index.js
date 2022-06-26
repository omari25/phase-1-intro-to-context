// Your code here
function createEmployeeRecord([firstName, familyName, title, payRatePerHour]){
    return {
        'firstName': firstName,
        'familyName': familyName,
        'title': title,
        'payPerHour': payRatePerHour,
        'timeInEvents': [],
        'timeOutEvents': []
    }
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateStamp){
    const date = dateStamp.slice(0,10)
    const hour = parseInt(dateStamp.slice(11,))
    const newTimeIn = {
        'type': 'TimeIn',
        'hour': hour,
        'date': date
    }
    employeeRecord.timeInEvents.push(newTimeIn)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    const date = dateStamp.slice(0,10)
    const hour = parseInt(dateStamp.slice(11,))
    const newTimeOut = {
        'type': 'TimeOut',
        'hour': hour,
        'date': date
    }
    employeeRecord.timeOutEvents.push(newTimeOut)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStamp){
    let hoursWorked
    let hourIn
    let hourOut
    employeeRecord.timeInEvents.forEach((timeIn)=>{
        if (timeIn.date === dateStamp){
            hourIn = timeIn.hour/100
        }
    })
    employeeRecord.timeOutEvents.forEach((timeOut)=>{
        if (timeOut.date === dateStamp){
            hourOut = timeOut.hour/100
        }
    })
    hoursWorked = hourOut - hourIn
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, dateStamp){
    const hoursWorked = hoursWorkedOnDate(employeeRecord, dateStamp)
    const wagesEarned = hoursWorked * employeeRecord.payPerHour
    return wagesEarned
}

function allWagesFor(employeeRecord){
    let allDates = []
    let pay = 0
    employeeRecord.timeOutEvents.forEach((timeOut)=>{
        allDates.push(timeOut.date)
    })
    allDates.forEach((date) => {
        pay = pay + wagesEarnedOnDate(employeeRecord, date)
    })
    return pay
}

function calculatePayroll(employeeRecordArray){
    let totalPayOwed = 0
    employeeRecordArray.forEach(employeeRecord => {
       totalPayOwed += allWagesFor(employeeRecord)
    })
    return totalPayOwed
}