# todo-app
Simple todo webapp (only for my own learning purposes)

This is a fairly simple and stupid Todo application that uses a faked database backend
because I couldn't be bothered with setting up a proper one.

I mostly did this to become more familiar with Angular.JS and Bootstrap; as such it is probably
not very practical to use for anyone really and has –for the moment– pretty sub-standard code.  
#### What it does so far:
  * Display stored todo items in a list
  * ability to add new todos to the list
  * ability to delete todos from the list

#### What needs to be done:
  * ~~improve styling for 'new todo' form~~ DONE (for now...until the optional 'improve design' task)
  * ~~implement marking todos as done~~ DONE (need to find a way so todos marked as done are either hidden or pushed to the bottom)
    * ~~additional todo attribute needed in json (boolean 'done')~~
    * ~~change styling of todo items to allow for a green border and check mark to be displayed when done~~
  * implement editing of todos
    * hide todo that is being edited and display its title and content in the 'new todo' form at the top
  * implement automatically replacing linebreaks ('\n') with html 'br' tags when creating new todos
  * reimplement a nicer search
    * search by human-readable date (not nanosec timestamp)
    * only start searching after 3rd character
  * REFACTOR!!!
    * especially make proper use of angular directives, services, and controllers

  * (Optional) improve design
  * (Optional) implement side menu
    * implement use of notebooks
      * create new notebooks in side menu
      * switch between notebooks in side menu
      * additional todo attribute needed in json (String 'notebook')
    * implement about page - implement some simple preferences

If anybody really wants to use this code or any parts of it: feel free to do so!  
It is published under GNU GPLv3 (contents of public/js/lib/ excluded).  
Although at this point I don't see why you would honestly :P
