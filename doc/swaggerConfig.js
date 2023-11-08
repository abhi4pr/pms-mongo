const customCss = `

  #Polygon-1 , #Polygon-2 , #Polygon-3 , #Polygon-4 , #Polygon-4, #Polygon-5 {
    animation: float 1s infinite ease-in-out alternate;
  }
  #Polygon-2 {
    animation-delay: .2s; 
  }
  #Polygon-3 {
    animation-delay: .4s; 
  }
  #Polygon-4 {
    animation-delay: .6s; 
  }
  #Polygon-5 {
    animation-delay: .8s; 
  }


  @keyframes float {
	100% {
    transform: translateY(20px);
  }
}
@media (max-width: 450px) {
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -190px;
  }
 
}

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
    font-size: 2.5em;
    color: #333;
  }

  .custom-homepage p {
    font-size: 1.2em;
    color: #666;
  }

  .custom-homepage .get-started {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1em;
    color: #fff;
    background-color: #5cb85c; /* Bootstrap 'success' green */
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .custom-homepage .get-started:hover {
    background-color: #4cae4c; /* A darker shade of green */
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

      //code for popup message
      const popup = document.createElement("div");
      popup.className = "custom-popup";
      popup.innerText =
        "Welcome, Developers! Here you will find all the API details you need. Review them carefully to help with your work also you can work here.";
      document.body.appendChild(popup);
      // Display the popup with fadeIn animation
      popup.classList.add("show");
      // Set timeout for the popup to fade out
      setTimeout(() => {
        popup.classList.replace("show", "hide");
      }, 5000);
      // Remove the popup after the fadeOut animation completes
      popup.addEventListener("animationend", (e) => {
        if (e.animationName === "fadeOut") {
          popup.remove();
        }
      });

      // Create custom homepage content
      const infoContainer = document.querySelector(".swagger-ui .info");
      const customHomepage = document.createElement("div");
      customHomepage.className = "custom-homepage";
      customHomepage.innerHTML = `
      
      <h1>Welcome to Jarvis API Hub</h1>
       <p>Welcome to the Jarvis API! Your central spot for managing and retrieving data efficiently. Explore our interactive API documentation below.</p>
      <svg width="180px" height="300px" viewBox="0 0 837 1045" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
         <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
           <path d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z" id="Polygon-1" stroke="#007FB2" stroke-width="6" sketch:type="MSShapeGroup"></path>
          <path d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z" id="Polygon-2" stroke="#EF4A5B" stroke-width="6" sketch:type="MSShapeGroup"></path>
          <path d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z" id="Polygon-3" stroke="#795D9C" stroke-width="6" sketch:type="MSShapeGroup"></path>
          <path d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z" id="Polygon-4" stroke="#F2773F" stroke-width="6" sketch:type="MSShapeGroup"></path>
          <path d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z" id="Polygon-5" stroke="#36B455" stroke-width="6" sketch:type="MSShapeGroup"></path>
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
    },
  },
};
