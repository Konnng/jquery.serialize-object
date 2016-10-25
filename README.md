# jQuery Serialize Object plugin
#### by Konnng Labs

Since jQuery does not have a core method to convert form data to a JSON object,
this plugin was built to solve this problem.

## Usage:

    <script src="jquery.js"></script>
    <script src="jquery.serialize-object.js"></script>

```HTML
    <form name="test-form" action="/test" method="post">
        Name: <input type="text" name="name"><br>
        Email: <input type="text" name="email"><br>
        Telephone (Home) <input type="text" name="tel[home]"><br>
        Telephone (Cellphone) <input type="text" name="tel[cel]"><br>

        <button type="submit">Send</button>
    </form>

    <script>
        $('form').on('submit', function(event){
            event.preventDefault();

            console.log($(this).serializeObject());
        });
    </script>
```

The code will output on console:

```JSON
{
    name: 'Lorem ipsum sit amet',
    email: 'loremipsum@sit.amet',
    tel: {
        home: '+55 55 55555-55555',
        cel: '+55 55 55555-55555',
    }
}
```

Copyright CC-BY-SA Konnng.com
