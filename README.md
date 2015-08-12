# jquery.introHelper

Intro Helper is a simple plugin for step-to-step guides. It make possible to create awesome instroductions for your site components or features.

Work in Progress.


# How to use

You can setup introHelper within a few steps.

**1)** Fisrt include jQuery

```
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
```

**2)** Next, include the introHelper css and js.

```
<link rel="stylesheet" type="text/css" href="jquery.introHelper.css">
<script type="text/javascript" src="jquery.introHelper.js"></script>
```

**3)** Now you can use the introHelper data attributes to choose and define your steps.
```
<div data-helper-step="1" data-helper-text="This component do..." data-helper-position-"right">
  <!-- Some content -->
</div>
```

**4)** Iniciate the introHelper plugin, passing the container of steps.

```
$(document).ready(function() {
	$('#btn').on('click', function() {
		$('body').helperIntro('start');
	});
});
```
