var lockedForm = $("#locked-form");
var targetForm = $("#target-form");
lockedForm.style.left = targetForm.offsetLeft + "px";


var tableAction = {
    
    lockCount: 0,

    createTable: function() {
        var firstTr = document.createElement("tr");
        for (var i = 0; i < data.colName.length; i++) {
            var curTh = document.createElement("th");
            curTh.innerHTML = (data.colName)[i];
            firstTr.appendChild(curTh);
        }
        $("#target-form").appendChild(firstTr);
        for (var i = 0; i < data.rowData.length; i++) {
            var curTr = document.createElement("tr");
            var curData = [];
            for (var j = 0; j < data.colName.length; j++) {
                var curTd = document.createElement("td");
                curTd.innerHTML = ((data.rowData)[i])[j];
                curData.push(((data.rowData)[i])[j]);
                curTr.appendChild(curTd);
            }
            $("#target-form").appendChild(curTr);
        }
    },
    
    addLockTableRow: function(rowId) {
        var lockedForm = $("#locked-form");
        var curTr = document.createElement("tr");
        var AllTr = $("tr");
        curTr.innerHTML = AllTr[rowId + tableAction.lockCount].innerHTML;
        lockedForm.appendChild(curTr);
        tableAction.lockCount++;
    },
    
    checkLockTable: function(rowId) {    
        lockedForm.style.left = targetForm.offsetLeft + "px";
        var toTop = document.documentElement.scrollTop + document.body.scrollTop;
        if (toTop > targetForm.offsetTop + targetForm.clientHeight || toTop < targetForm.offsetTop) {
            lockedForm.innerHTML = "";
            lockedForm.style.position = "";
            tableAction.lockCount = 0;
        }
        else {
            if (lockedForm.style.position == "fixed") return;
            if (document.documentElement.scrollTop + document.body.scrollTop > targetForm.offsetTop) {
                lockedForm.style.position = "fixed";
                tableAction.addLockTableRow(rowId);
            }
        }
    }
}

window.onscroll = function() {
    tableAction.checkLockTable(0);
}

window.onresize = function() {
    tableAction.checkLockTable(0);
}

window.onload = function() {
    tableAction.createTable();
}