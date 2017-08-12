# About 
The EatUp Hybrid Mobile application from the Kamusi app suite. Used for accurate restaurant menu translations.

# Setup
install npm and ionic 
run ionic serve to view the project
more on the docs homepage https://ionicframework.com/

# Documentation 
Pages: 
  1) About: Handles all of the language switching for both the server and the user, also links to the test_auth page 
  2) Auth-test: Experimental authentication page for user sign up/in
  3) Home: 'Meat' of the application. This is where most user interaction happens. The CSS is built around a dynamic linked stage system where each button pushes a new stage and thus a new set of styles.
  4) Loading: just the loading page/ temporary splash screen 
  5) Menu: Where the translated menu can be viewed. Has a card/material design 
  6) Questnav2: The chat navigation page. Chat features are stored in a tree and headers are in a linked list
  7) Quickask: The quick ask page with a similar tree structure to that of the questnav2 page
  8) Test: dev test page 
  9) Translator: The translation page, just word to word
  
Providers:
  1) Auth: The POST request for the user login - BROKEN rn.
  2) language-data: Handles language requests (both local and remote) for the app. Use this to set and get language of the server and user throughout the app
  3) menu-data: GETs the menu for a specific restaurant and language 
  4) translate-data: GETs specific words for translation between the server and user language 


