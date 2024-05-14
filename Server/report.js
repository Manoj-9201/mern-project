module.exports = (data) => {
  const today = new Date();

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Report</title>
      <style>
          @font-face {
              font-family: SourceSansPro;
              src: url(SourceSansPro-Regular.ttf);
            }
            
            .app-header{
              text-align-last: center;
            }
  
            .clearfix:after {
              content: "";
              display: table;
              clear: both;
            }
            
            a {
              color: #0087C3;
              text-decoration: none;
            }
            
            body {
              position: relative;
              width: 21cm;  
              height: 29.7cm; 
              margin: 0 auto; 
              color: #555555;
              background: #FFFFFF; 
              font-family: Arial, sans-serif; 
              font-size: 14px; 
              font-family: SourceSansPro;
            }
            
            header {
              padding: 10px 0;
              margin-bottom: 20px;
              border-bottom: 1px solid #AAAAAA;
            }
            
            #logo {
              float: left;
              margin-top: 8px;
            }
            
            #logo img {
              height: 70px;
            }
            
            #company {
              float: right;
              text-align: right;
            }
            
            
            #details {
              margin-bottom: 50px;
            }
            
            #client {
              padding-left: 6px;
              border-left: 6px solid #0087C3;
              float: left;
            }
            
            #client .to {
              color: #777777;
            }
            
            h2.name {
              font-size: 1.4em;
              font-weight: normal;
              margin: 0;
            }
            
            #invoice {
              float: right;
              text-align: right;
            }
            
            #invoice h1 {
              color: #0087C3;
              font-size: 2.4em;
              line-height: 1em;
              font-weight: normal;
              margin: 0  0 10px 0;
            }
            
            #invoice .date {
              font-size: 1.1em;
              color: #777777;
            }
            
            table {
              width: 100%;
              border-collapse: collapse;
              border-spacing: 0;
              margin-bottom: 20px;
            }
            
            table th,
            table td {
              padding: 10px;
              background: #EEEEEE;
              text-align: center;
              border-bottom: 1px solid #FFFFFF;
            }
            
            table th {
              white-space: nowrap;        
              font-weight: normal;
            }
            
            table td {
              text-align: right;
            }
            
            table td h3{
              color: #57B223;
              font-size: 1.2em;
              font-weight: normal;
              margin: 0 0 0.2em 0;
            }
            
            table .no {
              color: #FFFFFF;
              font-size: 1.6em;
              background: #57B223;
            }
            
            table .desc {
              text-align: left;
            }
            
            table .unit {
              background: #DDDDDD;
            }
            
            table .qty {
            }
            
            table .total {
              background: #57B223;
              color: #FFFFFF;
            }
            
            table td.unit,
            table td.qty,
            table td.total {
              font-size: 1.2em;
            }
            
            table tbody tr:last-child td {
              border: none;
            }
            
            table tfoot td {
              padding: 10px 20px;
              background: #FFFFFF;
              border-bottom: none;
              font-size: 1.2em;
              white-space: nowrap; 
              border-top: 1px solid #AAAAAA; 
            }
            
            table tfoot tr:first-child td {
              border-top: none; 
            }
            
            table tfoot tr:last-child td {
              color: #57B223;
              font-size: 1.4em;
              border-top: 1px solid #57B223; 
            
            }
            
            table tfoot tr td:first-child {
              border: none;
              }
            
            #thanks{
              font-size: 2em;
              margin-bottom: 50px;
            }
            
            #notices{
              padding-left: 6px;
              border-left: 6px solid #0087C3;  
              margin-bottom:100px;
            }
            
            #notices .notice {
              font-size: 1.2em;
            }
            
            footer {
              color: #777777;
              width: 100%;
              height: 30px;
              position: absolute; 
              bottom: 0;
              border-top: 1px solid #AAAAAA;
              padding: 8px 0;
              text-align: center;
              z-index: 999;
            }
        body {
          margin: 4rem;
          position: relative;
          width: 21cm;
          height: 29.7cm;
          margin: 0 auto;
          color: #555555;
          background: #ffffff;
          font-family: Arial, sans-serif;
          font-size: 14px;
          font-family: SourceSansPro;
        }
  
        .header {
          background-color: #f2f2f2;
          padding: 20px;
          margin-bottom: 20px;
          height: 3rem;
        }
  
        .header-left {
          float: left;
          font-size: xx-large;
        }
  
        .header-right {
          float: right;
          font-size: large;
        }
  
        .maturity-container {
          display: flex;
          justify-content: space-between;
        }
  
        .columns {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
          font-size: medium ;
        }
  
        .column {
          flex: 1;
          padding: 10px;
        }
  
        .centered-box {
          text-align:center;
          background-color: #ffffff;
          padding: 0px;
          margin-top: 150px;
          display: flex;
          flex-direction: column;
          position: absolute; 
          top: 0; 
          right: 0; 
          flex-direction: column;
        }
  
        .large-number {
          font-size: 60px;
          font-weight: bold;
        }
        table {
          border-collapse: collapse;
          width: 100%;
        }
  
        th,
        td {
          padding: 10px;
          text-align: left;
        }
  
        thead {
          background-color: #f2f2f2;
        }
  
        .no {
          width: 5%;
        }
        
        .Sec {
          width: 30%;
          text-align: left;
          margin-left: 16rem;
        }
  
        .Sec:first-child  {
          width: 30%;
          text-align: center;
          margin-left: 16rem;
        }
  

        .crit,
        .total {
          width: 25%;
          text-align: center;
        }
  
        h3 {
          margin: 0;
        }
        
      @page {
        size: A4;
        margin: 0;
      }

      </style>
    </head>
    <body>
      <!-- <header class="app-header">
        <div id="company">
          <!-- <h1 class="name">Security Report</h1> -->
        <!-- </div>
      </header> --> 
      <div class="header">
        <div class="header-left">SECURITY REPORT</div>
        <div class="header-right">DATE: ${`${today.getDate()}. ${
          today.getMonth() + 1
        }. ${today.getFullYear()}.`}</div>
      </div>
      <header class="app-header">
        <div id="company">
          <!-- <h1 class="name">Security Report</h1> -->
        </div>
      </header>
      <div class="maturity-container">
        <div class="columns">
          <div class="column">NAME: <span>${data.name}</span></div>
          <div class="column">PRODUCT TYPE: <span>${
            data.Product_type
          }</span></div>
          <div class="column">PROFILE: <span>${data.profile}</span></div>
        </div>
  
        <div class="centered-box">
          <div><h2 style= >Maturity Level</h2></div>
          <div class="large-number">${data.level}</div>
        </div>
      </div>
  
      <table border="0" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th class="no">#</th>
            <th class="Sec">SECURITY CATEGORY</th>
            <th class="total">COMPLETED PERCENTAGE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="no">01</td>
            <td class="Sec"><h3>Architecture</h3></td>
         
  
            <td class="total">${data.architecture}</td>
          </tr>
          <tr>
            <td class="no">02</td>
            <td class="Sec"><h3>Authentication</h3></td>
         
  
            <td class="total">${data.authentication}</td>
          </tr>
          <tr>
            <td class="no">03</td>
            <td class="Sec"><h3>Session Management</h3></td>
         
  
            <td class="total">${data.sessionManagement}</td>
          </tr>
          <tr>
            <td class="no">04</td>
            <td class="Sec"><h3>Access Control</h3></td>
         
            
  
            <td class="total">${data.accessControl}</td>
          </tr>
          <tr>
            <td class="no">05</td>
            <td class="Sec"><h3>Input Validation</h3></td>
         
  
            <td class="total">${data.inputValidation}</td>
          </tr>
          <tr>
            <td class="no">06</td>
            <td class="Sec"><h3>Cryptography at Rest</h3></td>
         
  
            <td class="total">${data.cryptography}</td>
          </tr>
          <tr>
            <td class="no">07</td>
            <td class="Sec"><h3>Error Handling and Logging</h3></td>
         
  
            <td class="total">${data.errorhandling}</td>
          </tr>
          <tr>
            <td class="no">08</td>
            <td class="Sec"><h3>Data Protection</h3></td>
         
            <td class="total">${data.dataProtection}</td>
          </tr>
          <tr>
            <td class="no">09</td>
            <td class="Sec"><h3>Communication Security</h3></td>
         
  
            <td class="total">${data.communication}</td>
          </tr>
          <tr>
            <td class="no">10</td>
            <td class="Sec"><h3>Malicoious Code</h3></td>
         
  
            <td class="total">${data.maliciousCode}</td>
          </tr>
          <tr>
            <td class="no">11</td>
            <td class="Sec"><h3>Business Logic</h3></td>
         
  
            <td class="total">${data.businessLogic}</td>
          </tr>
          <tr>
            <td class="no">12</td>
            <td class="Sec"><h3>Files and Resources</h3></td>
         
  
            <td class="total">${data.files}</td>
          </tr>
          <tr>
            <td class="no">13</td>
            <td class="Sec"><h3>Web Services</h3></td>
         
  
            <td class="total">${data.webServices}</td>
          </tr>
          <tr>
            <td class="no">14</td>
            <td class="Sec"><h3>Configuration</h3></td>
         
  
            <td class="total">${data.configuration}</td>
          </tr>
        </tbody>
      </table>
      <div id="thanks">Thank you!</div>
        <div id="notices">
          <div>NOTICE:</div>
          <div class="notice">Complete every category to 100% to make your product fully secured</div>
        </div>
      <!-- Rest of your content goes here -->
      <footer>
       
      </footer>
    </body>
  </html>
  

  

    
    `;
};
