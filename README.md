#JavaScript (ECMAScript6) MultiConversion Countdown Timer, experimental

18.02:
The App converts the current countdown time into binary or roman numeral format.
1 unit (hour, minute, second,...) represents one binary/roman number. 
The Countdown app is based on previous project (Multiconversion Clock) replaced with a Countdown class.

The User Interface is the html table itself with eventlisteners, it's a kind of "Binary Abacus", by clicking the
cells, the bin values will be incremented dependent on the selection (powers of 2). 
Each timeunit has a maximum sum of 63 (decimal). Every remainder will be converted
into the next higher unit. For example 63 seconds are 1 minute and 3 seconds.

20.02:
Radio button for Increment/Decrement added. => subtraction is now supported 