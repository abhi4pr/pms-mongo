const customCss = `
.swagger-ui .topbar .link {
    content: url('/uploads/assets/logo-light.png'); /* Relative to the server root */
  }

  /* Hide the default Swagger Info */
  .swagger-ui .info {
    display: none;
  }

  /* Add a custom homepage container */
  .custom-homepage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 60px); /* Adjust height as per your header size */
    text-align: center;
    background: #fff; /* Or any other background */
    padding: 20px;
  }

  .custom-homepage h1 {
    font-size: 3.5em;
    color: #333;
    font-family: 'Indie Flower', cursive;
    background-image: linear-gradient(to right, #999999, #ffd700);
    -webkit-background-clip: text;
    color: transparent;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    margin: 0;
    padding: 20px;
    border-right: 0.1em solid #ffd700; /* The cursor */
    white-space: nowrap;
    overflow: hidden;
    /* Run typing to the end, then blink-caret for a certain number of steps before stopping */
    animation: typing 5s steps(30, end) forwards, blink-caret 0.75s step-end 6.5; /* Adjust the number of steps as needed */
  }
  
  /* The typing effect */
  @keyframes typing {
    from { width: 0; }
    to { width: 100%; border-color: transparent; } /* Set the border color to transparent at the end to hide the blinking cursor */
  }
  
  /* The typing cursor effect */
  @keyframes blink-caret {
    from, to { border-color: transparent; }
    50% { border-color: #ffd700; }
  }
  

  .custom-homepage p {
    font-size: 1.2em;
    color: #666;
  }

  .custom-homepage .get-started {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 2em;
    width: 250px; 
    color: #fff; /* White text */
    background-image: linear-gradient(to right, #fdd835, #333333); /* Gradient from yellow to black */
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-image 0.3s, transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25); /* Text shadow to enhance contrast */
  }
  
  .custom-homepage .get-started:hover {
    background-image: linear-gradient(to right, #e6b800, #1a1a1a); /* A brighter yellow and darker black for hover */
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
  
  .custom-homepage .get-started:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  
  .swagger-ui .topbar .link {
    content: url('/uploads/assets/logo-light.png'); /* Relative to the server root */
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; transform: translateX(0); }
    to { opacity: 0; transform: translateX(20px); }
  }
  
  .custom-popup {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    background-color: #333;
    color: white;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    opacity: 0; /* Start with an invisible pop-up for the animation */
    transform: translateX(20px); /* Start offscreen to the right */
    transition: all 0.3s ease-in-out;
  }
  
  /* Initially hidden */
  .custom-popup.hide {
    animation: fadeOut 0.5s ease-in-out forwards;
  }
  
  /* Shown with fade-in effect */
  .custom-popup.show {
    animation: fadeIn 0.5s ease-in-out forwards;
  }
  
  `;

module.exports.swaggerConfig = {
  customSiteTitle: "Jarvis Api Documentation",
  customfavIcon: "/uploads/assets/image20.png",
  customCss,
  swaggerOptions: {
    docExpansion: "none",
    filter: true,
    onComplete: function () {
      //Code for filer
      const filterInput =
        document.querySelector(".filter-input input") ||
        document.querySelector('input[placeholder="Filter by tag"]');
      if (filterInput) {
        filterInput.placeholder = "Search the Module..."; // Set your custom placeholder text here
      }
      // Create custom homepage content
      const infoContainer = document.querySelector(".swagger-ui .info");
      const customHomepage = document.createElement("div");
      customHomepage.className = "custom-homepage";
      customHomepage.innerHTML = `
      
      <h1>" Welcome to Jarvis API Hub "</h1>
       <p>Your central spot for managing and retrieving data efficiently. Explore our interactive API documentation below.</p>
       <svg width="451" height="238" viewBox="0 0 451 238" xmlns="http://www.w3.org/2000/svg">
       <g fill="none" fill-rule="evenodd">
         <g fill-rule="nonzero">
           <path d="M433.525 50.122c15.386 25.711 26.592 109.8-21.653 109.8s-37.04-84.088-21.653-109.8c6.354-10.62 14.828-15.534 21.653-15.534 6.825 0 15.299 4.914 21.653 15.534z"/>
           <path d="M411.872 162.921c-13.134 0-23.476-6-29.908-17.342-6.8-11.988-9.355-30.231-7.2-51.368 1.8-17.645 6.854-35.555 12.882-45.629 6.367-10.642 15.424-16.994 24.228-16.994 8.804 0 17.86 6.352 24.227 16.994 6.029 10.073 11.085 27.983 12.883 45.628 2.153 21.137-.4 39.38-7.2 51.368-6.436 11.346-16.778 17.343-29.912 17.343zm0-125.333c-5.153 0-12.87 3.7-19.08 14.074-5.612 9.379-10.346 26.318-12.061 43.156-2.028 19.91.264 36.887 6.452 47.8 5.38 9.489 13.687 14.3 24.689 14.3s19.309-4.812 24.689-14.3c6.189-10.915 8.48-27.892 6.452-47.8-1.715-16.838-6.45-33.777-12.062-43.156-6.213-10.377-13.927-14.074-19.08-14.074z" fill="#E4E4E4"/>
           <path d="M412.39 226.58a3 3 0 01-3-3V71a3 3 0 116 0v152.58a3 3 0 01-3 3z" fill="#E4E4E4"/>
           <path d="M413.3 101.684a3 3 0 01-2.2-5.037l8.105-8.77a3 3 0 014.458 4.016l-.051.056-8.1 8.771a3.004 3.004 0 01-2.212.964z" fill="#E4E4E4"/>
           <path d="M412.394 131.58a3 3 0 01-1.65-5.507l12.68-8.334a3 3 0 013.294 5.014l-12.68 8.334a2.985 2.985 0 01-1.644.493z" fill="#E4E4E4"/>
           <path d="M411.87 116.58a2.98 2.98 0 01-1.795-.6l-8.467-6.334a3 3 0 013.594-4.8l8.467 6.334a3 3 0 01-1.8 5.4z" fill="#E4E4E4"/>
           <g>
             <path d="M75.42 21.137c15.385 30.019 26.59 128.2-21.654 128.2-48.245 0-37.038-98.177-21.653-128.2C38.468 8.737 46.94 3 53.766 3 60.59 3 69.065 8.737 75.42 21.137z"/>
             <path d="M53.766 152.333c-11.908 0-21.25-5.4-27.764-16.065-17.984-29.423-8.517-93.167 3.44-116.5C35.788 7.391 44.88 0 53.767 0c8.886 0 17.98 7.391 24.324 19.768 11.958 23.333 21.424 87.077 3.44 116.5-6.514 10.66-15.855 16.065-27.764 16.065zM53.766 6c-5.088 0-12.747 4.336-18.983 16.5C28.875 34.027 23.9 55.527 22.407 76c-1.8 24.7 1.29 44.99 8.714 57.136 5.426 8.877 12.833 13.193 22.645 13.193s17.22-4.316 22.646-13.193C83.835 120.99 86.929 100.699 85.126 76c-1.494-20.472-6.468-41.972-12.376-53.5C66.513 10.336 58.854 6 53.766 6z" fill="#E4E4E4"/>
             <path d="M54.286 226.58a3 3 0 01-3-3V71a3 3 0 116 0v152.58a3 3 0 01-3 3z" fill="#E4E4E4"/>
             <path d="M54.288 92.913a3 3 0 01-1.795-5.4l10.733-8a3 3 0 113.586 4.81l-10.733 8a2.984 2.984 0 01-1.791.59z" fill="#E4E4E4"/>
             <path d="M54.289 121.913a3 3 0 01-1.715-5.463l16.785-11.668a3 3 0 013.447 4.911l-.023.016-16.785 11.667a2.984 2.984 0 01-1.71.537z" fill="#E4E4E4"/>
             <path d="M53.765 105.58a2.99 2.99 0 01-2.052-.813L40.35 94.101a3.002 3.002 0 014.108-4.376l11.36 10.667a3 3 0 01-2.054 5.188z" fill="#E4E4E4"/>
           </g>
         </g>
         <g transform="translate(0 4)">
           <g transform="translate(95.653)">
             <path d="M145.032 210.474L142.837 186h-35.985l-2.192 24.474c-.51 5.685-3.933 11.127-9.306 15.474l-.007.052h59l-.006-.052c-5.373-4.347-8.8-9.79-9.31-15.474z" fill="#BFCFE2" fill-rule="nonzero"/>
             <g opacity=".28" fill="#333333" fill-rule="nonzero">
               <path d="M106.396 185.69l-1.31 14.541h38.397l-1.309-14.542z"/>
               <path d="M143.484 201.671h-38.399c-.407 0-.794-.17-1.069-.468a1.435 1.435 0 01-.373-1.1l1.31-14.545a1.445 1.445 0 011.442-1.311h35.778c.75 0 1.376.569 1.443 1.311l1.31 14.544c.036.403-.1.802-.374 1.1a1.452 1.452 0 01-1.069.469zm-36.815-2.88h35.23l-1.05-11.664H107.72l-1.05 11.664z"/>
             </g>
             <path d="M153.894 227H94.806a1.46 1.46 0 01-1.448-1.634c.047-.391.238-.751.536-1.01 5.204-4.21 8.324-9.362 8.785-14.503l2.199-24.526A1.458 1.458 0 01106.33 184h36.038c.755 0 1.386.576 1.453 1.327l2.2 24.526c.46 5.141 3.58 10.292 8.784 14.504.294.237.484.58.53.956.05.42-.077.844-.353 1.166-.272.32-.668.51-1.089.521zm-55.359-2.915h51.627c-4.139-4.202-6.611-9.063-7.05-13.973l-2.08-23.197h-33.367l-2.08 23.198c-.44 4.91-2.909 9.77-7.05 13.972z" fill="#1F3969" fill-rule="nonzero"/>
             <rect fill="#FFF" fill-rule="nonzero" x="1.347" y="23" width="246" height="167" rx="12"/>
             <rect fill="#BFCFE2" fill-rule="nonzero" x="1.347" y="23" width="246" height="167" rx="12"/>
             <path d="M239.213 191H10.481C4.887 190.994.354 186.444.347 180.83V31.17C.353 25.557 4.887 21.007 10.481 21h228.732c5.595.006 10.128 4.556 10.134 10.17v149.66c-.006 5.614-4.54 10.164-10.134 10.17zM10.481 23.906c-3.996.004-7.234 3.254-7.239 7.265v149.658c.005 4.01 3.243 7.26 7.239 7.265h228.732c3.996-.005 7.234-3.255 7.239-7.265V31.171c-.005-4.01-3.243-7.26-7.239-7.265H10.481z" fill="#1F3969" fill-rule="nonzero"/>
             <path fill="#F6F9FD" fill-rule="nonzero" d="M235.847 34.5v127h-222v-127z"/>
             <g opacity=".28" fill="#333333" fill-rule="nonzero">
               <path d="M21.466 22.709v100.962c0 3.218 2.593 5.828 5.79 5.828H164.11c3.198 0 5.79-2.61 5.79-5.828V22.709H21.467z"/>
               <path d="M164.109 130.956H27.257c-3.996-.005-7.234-3.264-7.238-7.285V22.709c0-.805.648-1.457 1.447-1.457H169.9c.799 0 1.447.652 1.447 1.457v100.962c-.004 4.021-3.242 7.28-7.238 7.285zM22.914 24.166v99.505c.003 2.413 1.946 4.368 4.343 4.37h136.852c2.398-.002 4.34-1.957 4.343-4.37V24.166H22.914z"/>
             </g>
             <path d="M235.896 163H13.799a1.454 1.454 0 01-1.452-1.456V34.456c0-.804.65-1.456 1.452-1.456h222.097c.801 0 1.451.652 1.451 1.456v127.088c0 .804-.65 1.456-1.451 1.456zM15.25 160.088h219.194V35.912H15.25v124.176z" fill="#1F3969" fill-rule="nonzero"/>
             <path d="M133.923 177h-19.151c-.787 0-1.425-.672-1.425-1.5s.638-1.5 1.425-1.5h19.15c.787 0 1.425.672 1.425 1.5s-.638 1.5-1.424 1.5z" fill="#1F3969" fill-rule="nonzero"/>
             <rect fill="#333333" fill-rule="nonzero" x="28.347" y="2" width="149" height="119" rx="8"/>
             <path d="M176.903 17H28.792a1.447 1.447 0 01-1.445-1.45V7.248C27.352 3.247 30.583.004 34.57 0h136.555c3.987.004 7.218 3.247 7.222 7.248v8.302c0 .801-.647 1.45-1.444 1.45zM30.235 14.1h145.223V7.249a4.346 4.346 0 00-4.333-4.349H34.57a4.347 4.347 0 00-4.335 4.35V14.1z" fill="#1F3969" fill-rule="nonzero"/>
             <path d="M34.16 2h137.375c3.21 0 5.812 2.617 5.812 5.846V19h-149V7.846C28.347 4.617 30.95 2 34.16 2z" fill="#D0DDF0" fill-rule="nonzero"/>
             <path d="M176.903 20H28.792a1.456 1.456 0 01-1.445-1.467V7.336C27.352 3.286 30.583.004 34.57 0h136.555c3.987.004 7.218 3.286 7.222 7.336v11.197c0 .81-.647 1.467-1.444 1.467zM30.235 17.066h145.223v-9.73c-.002-2.43-1.94-4.4-4.333-4.402H34.57c-2.393.003-4.331 1.972-4.335 4.402v9.73z" fill="#1F3969" fill-rule="nonzero"/>
             <path d="M176.903 20H28.792a1.456 1.456 0 01-1.445-1.467V7.336C27.352 3.286 30.583.004 34.57 0h136.555c3.987.004 7.218 3.286 7.222 7.336v11.197c0 .81-.647 1.467-1.444 1.467zM30.235 17.066h145.223v-9.73c-.002-2.43-1.94-4.4-4.333-4.402H34.57c-2.393.003-4.331 1.972-4.335 4.402v9.73z" fill="#1F3969" fill-rule="nonzero"/>
             <path d="M171.125 123H34.57c-3.987-.004-7.218-3.248-7.223-7.25V8.25c.005-4.002 3.236-7.246 7.223-7.25h136.555c3.987.004 7.218 3.248 7.222 7.25v107.5c-.004 4.002-3.235 7.246-7.222 7.25zM34.57 3.9a4.347 4.347 0 00-4.334 4.35v107.5a4.347 4.347 0 004.334 4.35h136.555a4.346 4.346 0 004.333-4.35V8.25a4.346 4.346 0 00-4.333-4.35H34.57z" fill="#1F3969" fill-rule="nonzero"/>
             <g class="js-layout-frame">
               <g opacity=".28" transform="translate(150.347 44)" fill="#1F3969" fill-rule="nonzero">
                 <rect x="1.932" y="1.733" width="95.398" height="100.349" rx="8"/>
                 <path d="M91.549 103.528H7.713a7.233 7.233 0 01-7.227-7.223V7.511A7.232 7.232 0 017.713.29h83.836a7.232 7.232 0 017.226 7.222v88.794a7.233 7.233 0 01-7.226 7.223zM7.713 3.178A4.339 4.339 0 003.377 7.51v88.794a4.34 4.34 0 004.336 4.334h83.836a4.34 4.34 0 004.336-4.334V7.511a4.339 4.339 0 00-4.336-4.333H7.713z"/>
               </g>
               <rect fill="#2AA1FF" fill-rule="nonzero" x="158.347" y="41" width="96" height="101" rx="8"/>
               <path d="M248.069 143h-84.443a7.286 7.286 0 01-7.279-7.275v-89.45A7.285 7.285 0 01163.626 39h84.443a7.285 7.285 0 017.278 7.275v89.45A7.286 7.286 0 01248.07 143zM163.626 41.91a4.37 4.37 0 00-4.367 4.365v89.45a4.371 4.371 0 004.367 4.365h84.443a4.371 4.371 0 004.367-4.365v-89.45a4.37 4.37 0 00-4.367-4.365h-84.443z" fill="#1F3969" fill-rule="nonzero"/>
             </g>
             <g class="js-layout-els">
               <rect stroke="#FFF" stroke-width="2" opacity=".34" style="mix-blend-mode:screen" stroke-linecap="round" stroke-linejoin="round" x="172.347" y="55" width="67" height="13" rx="5.167"/>
               <g opacity=".34" style="mix-blend-mode:screen" transform="translate(172.347 76)" stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                 <rect x=".555" y=".476" width="40.328" height="13.362" rx="5.167"/>
                 <rect x="46.6" y=".476" width="20.164" height="13.362" rx="5.167"/>
               </g>
               <path stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M172.347 111.5h67"/>
               <path stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M172.347 119.5h67"/>
               <path stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M172.347 127.5h41"/>
             </g>
             <circle fill="#1F3969" fill-rule="nonzero" cx="42.347" cy="10" r="3"/>
             <circle fill="#1F3969" fill-rule="nonzero" cx="52.347" cy="10" r="3"/>
             <circle fill="#1F3969" fill-rule="nonzero" cx="62.347" cy="10" r="3"/>
             <g stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
               <path class="js-code-line" stroke="#9169FF" d="M45.347 32.5h14"/>
               <path class="js-code-line" stroke="#7BFFA0" d="M65.347 32.5h41"/>
               <path class="js-code-line" stroke="#FFF" d="M113.347 32.5h9"/>
               <path class="js-code-line" stroke="#FFC47D" d="M52.347 41.5h20"/>
               <path class="js-code-line" stroke="#9169FF" d="M79.347 41.5h20"/>
               <path class="js-code-line" stroke="#FFF" d="M106.347 41.5h6"/>
               <path class="js-code-line" stroke="#FF5757" d="M62.347 50.5h16"/>
               <path class="js-code-line" stroke="#FFF" d="M84.347 50.5h17"/>
               <path class="js-code-line" stroke="#7BFFA0" d="M52.347 58.5h13"/>
               <path class="js-code-line" stroke="#9169FF" d="M71.347 58.5h8"/>
               <path class="js-code-line" stroke="#FFF" d="M86.347 58.5h4"/>
               <path class="js-code-line" stroke="#FF5757" d="M52.347 67.5h21"/>
               <path class="js-code-line" stroke="#FFC47D" d="M80.347 67.5h23"/>
               <path class="js-code-line" stroke="#7BFFA0" d="M62.347 76.5h11"/>
               <path class="js-code-line" stroke="#FF5757" d="M80.347 76.5h20"/>
               <path class="js-code-line" stroke="#9169FF" d="M107.347 76.5h13"/>
               <path class="js-code-line" stroke="#9169FF" d="M62.347 85.5h20"/>
               <path class="js-code-line" stroke="#FFF" d="M89.347 85.5h11"/>
               <path class="js-code-line" stroke="#FFF" d="M52.347 94.5h20"/>
               <path class="js-code-line" stroke="#FFC47D" d="M79.347 94.5h32"/>
               <path class="js-code-line" stroke="#FFF" d="M118.347 94.5h13"/>
               <path class="js-code-line" stroke="#7BFFA0" d="M45.347 103.5h10"/>
               <path class="js-code-line" stroke="#9169FF" d="M64.347 103.5h31"/>
             </g>
             <path fill="#fdd835" fill-rule="nonzero" d="M264.062 146.703l7.062-.83 6.137 52.335-7.062.83z"/>
             <path fill="#2AA1FF" fill-rule="nonzero" d="M264.062 146.703l7.062-.83.625 5.324-7.063.83z"/>
             <path d="M264.502 153c-.764 0-1.406-.548-1.495-1.274l-.65-5.291c-.046-.38.067-.762.314-1.062.248-.3.61-.494 1.006-.538l7.34-.825c.397-.045.796.063 1.109.3.314.237.516.584.562.964l.649 5.29c.097.792-.494 1.508-1.32 1.6l-7.34.826c-.058.006-.116.01-.175.01zm1.023-5.47l.297 2.428 4.348-.489-.297-2.427-4.348.489z" fill="#1F3969" fill-rule="nonzero"/>
             <path d="M269.887 200c-.73 0-1.345-.55-1.43-1.28l-6.1-52.273a1.455 1.455 0 01.3-1.067c.237-.302.583-.496.962-.541l7.02-.83c.38-.044.76.065 1.06.303.3.238.494.586.539.968l6.1 52.273c.044.381-.064.765-.3 1.067a1.438 1.438 0 01-.963.541l-7.02.829c-.055.006-.112.01-.168.01zm-4.501-52.451l5.761 49.394 4.16-.49-5.762-49.395-4.159.49z" fill="#1F3969" fill-rule="nonzero"/>
             <path fill="#FF5252" fill-rule="nonzero" d="M283.502 155.762l7.069.769-5.689 52.385-7.069-.77z"/>
             <path d="M285.057 210c-.054 0-.108 0-.163-.008l-7.226-.769c-.812-.086-1.399-.8-1.312-1.594l5.814-52.337c.088-.794.817-1.368 1.63-1.284l7.226.768c.812.087 1.4.8 1.313 1.595l-5.815 52.336a1.47 1.47 0 01-1.467 1.293zm-5.597-3.502l4.281.456 5.495-49.455-4.28-.456-5.496 49.455z" fill="#1F3969" fill-rule="nonzero"/>
             <path fill="#fdd835" fill-rule="nonzero" d="M283.502 155.761l7.07.77-.58 5.328-7.068-.769z"/>
             <path d="M290.236 163c-.055 0-.11 0-.165-.008l-7.375-.77c-.829-.086-1.428-.8-1.34-1.596l.604-5.332c.09-.795.835-1.37 1.663-1.286l7.375.77c.83.086 1.429.8 1.34 1.596l-.604 5.331c-.083.735-.728 1.293-1.498 1.295zm-5.71-3.507l4.368.456.277-2.445-4.368-.457-.278 2.446z" fill="#1F3969" fill-rule="nonzero"/>
             <path fill="#fdd835" fill-rule="nonzero" d="M294.684 226H266.01l-4.663-44h38z"/>
             <path fill="#fdd835" fill-rule="nonzero" style="mix-blend-mode:overlay" d="M261.347 182l.086.808h28.951L285.807 226h8.877l4.663-44z"/>
             <path d="M295.21 228h-28.727a1.464 1.464 0 01-1.456-1.31l-4.672-44.071a1.465 1.465 0 011.456-1.619h38.073a1.463 1.463 0 011.455 1.619l-4.672 44.07A1.464 1.464 0 01295.21 228zm-27.411-2.93h26.096l4.361-41.14h-34.819l4.362 41.14z" fill="#1F3969" fill-rule="nonzero"/>
           </g>
           <rect fill="#E4E4E4" fill-rule="nonzero" y="221" width="448" height="13" rx="6.5"/>
         </g>
       </g>
     </svg>
     
        <button class="get-started">Get Started</button>
      `;

      // Insert the custom homepage before the info container
      infoContainer.parentNode.insertBefore(customHomepage, infoContainer);

      // Scroll to Swagger's 'Try it out' section when 'Get Started' is clicked
      customHomepage
        .querySelector(".get-started")
        .addEventListener("click", () => {
          const tryItOutSection = document.querySelector(
            ".swagger-ui .opblock-tag-section"
          );
          tryItOutSection.scrollIntoView({ behavior: "smooth" });
        });

      // Get the token from the URL
      const urlParts = window.location.pathname.split("/");
      const token = urlParts[urlParts.length - 2];

      /* Handle feature when user close tab */
      window.addEventListener("beforeunload", function (event) {
        navigator.sendBeacon(`/doc-logout/${token}`); // Using sendBeacon for asynchronous request
      });

      /* Handle if not activity perform on page like no key press or mouse */
      let inactivityTime = function () {
        let time;
        window.onload = resetTimer;
        // Events that reset the timer
        document.onmousemove = resetTimer;
        document.onkeypress = resetTimer;

        function logout() {
          // Call your logout API
          fetch('/doc-logout/' + token, { method: "POST" }) // Replace with your actual logout API call
            .then(() => (window.location.href = `/doc-login`))
            .catch((err) => console.error("Error:", err));
        }

        function resetTimer() {
          clearTimeout(time);
          // Set timeout for 1 hour (3600000 ms)
          time = setTimeout(logout, 1500000);
        }
      };

      inactivityTime(); // Initialize the inactivity timer function
    },
  },
};
