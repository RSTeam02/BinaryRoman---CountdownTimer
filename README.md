#JavaScript (ECMAScript6) MultiConversion Countdown Timer, experimental

The App converts the current countdown time into binary or roman numeral format.
1 unit (hour, minute, second,...) represents one binary/roman number. 
The Countdown app is based on previous project (Multiconversion Clock) replaced with a Countdown class.

The User Interface is the table itself with eventlisteners, it's a kind of "Binary Abacus". By clicking in the
cells the bin values will be added per timeunit. Each timeunit has a sum of 63 (decimal). Every remainder will be converted
to the next higher unit. For example 63 seconds are 1 minute and 3 seconds. Subtraction is not (yet) supported.
 
