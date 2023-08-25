export const preloaderScrollbar = () => {
    // scrollbar scrolling
    window.addEventListener("load resize", function() {
        var scrollWidth = document.querySelector('.tbl-content').offsetWidth - document.querySelector('.tbl-content table').offsetWidth;
        document.querySelector('.tbl-header').style.paddingRight = scrollWidth + "px";
    });

    // preloader setting
    function showPreloader() {
        document.querySelector('.preloader').style.display = 'none';
    }
    // function showPreloader() {
    //     document.querySelector('.preloader').style.display = 'flex';
    // }
    
    function hidePreloader() {
        document.querySelector('.preloader').style.display = 'none';
    }
    
    window.addEventListener('load', function() {
        setTimeout(hidePreloader, 300); // hide preloader after 1 second
    });
    
    showPreloader(); // show preloader before page loads
    
}

export const Reloader = (time) => {
    setTimeout(() => { 
        window.location.reload();
    }, time*1000);
}

export const isLoggedIn = (loginFunc,logout) => {
    if (localStorage.isLoggedIn === "yes") {
        logout.addEventListener("click", () => {
        //   localStorage.clear();
          localStorage.removeItem('isLoggedIn');
          console.log("logout successful");
        });
        console.log("local storage ok");
        loginFunc();
    } else {
        // redirect to login page
        window.location.assign("../../login.html");
    }
};

export const PrintDocuments = (button='.gg-printer',css, section,section2='') => {
    document.querySelector(`${button}`).addEventListener("click", (e) => {
      const printWindow = window.open("", "");
      printWindow.document.write("<html><head>");
      printWindow.document
        .write(`${css}`);
      printWindow.document.write("</head><body>");
      printWindow.document.write(section.innerHTML);
      printWindow.document.write(section2.innerHTML?section2.innerHTML:"");
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    });
}
