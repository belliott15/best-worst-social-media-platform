## The Golden Rule:

🦸 🦸‍♂️ `Stop starting and start finishing.` 🏁

If you work on more than one feature at a time, you are guaranteed to multiply your bugs and your anxiety.

## Making a plan

1. **Make a drawing of your app. Simple "wireframes"**
![wireframe for social media](/assets/List%20Page.png "list page")
![wirefram for social media](/assets/Details%20page.png "detail page")
1. **Once you have a drawing, name the HTML elements you'll need to realize your vision**
1. **For each HTML element ask: Why do I need this?**
1. **Once we know _why_ we need each element, think about how to implement the "Why" as a "How"**
1. **Find all the 'events' (user clicks, form submit, on load etc) in your app. Ask one by one, "What happens when" for each of these events. Does any state change?**
1. **Think about how to validate each of your features according to a Definition of Done**
1. **Consider what features _depend_ on what other features. Use this dependency logic to figure out what order to complete tasks.**


## HTMl List page
-Header, body, footer included.
    -h1 Welcome can do header or body
    -div display all profiles created at signup
        -h3 display profile email
        -p display Karma
    -logout button


## Event Listeners list page
-load display all profiles created
-logout button
-on click of profile take to detail page

## HMTL Detail Page
-header
    -home anchor tag
    -h1 display profile name (pull from urlsearchparams)
-body
    -div to display karma rating, message to, message recieved
        -div for karma rating
            -h2 karma rating
            -button increment
            -button decrement
        -div messsage writing
            -h3 type message to profile
            -form
                -input name = message
                -button to submit
        -div to display all messages
            -create render and append to populate

## Event Listeners detail page
-on load display
    -profile name
    -type message to profile name
    -karma rating
    -list of all messages
-increment and decrement buttons
-submit for messages
