{{#list}}
	{{#isActive}}
		<li class="side-item active">
	{{/isActive}}
	{{^isActive}}
		<li class="side-item">
	{{/isActive}}
		<a class="link" href={{url}}>{{desc}}</a>
    </li>
{{/list}}