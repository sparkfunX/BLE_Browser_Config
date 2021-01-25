BLE Configurator Example
===========================================================

![Sending config value](./images/Sending%20Setting.jpg)

-> *Setting config value over BLE from browser* <-

This repo demonstrates how to connect to an Artemis or ESP32 and send and receive a configuration value such as baud rate. 

All BLE transactions are defined to be a series of bytes. If the Artemis transmits a value the browser will receive an array of bytes, little endian. The browser must have preexisting knowledge of the size of each configuration setting (1, 2, 4bytes, etc) and reconstruct accordingly.

To play, load either the Artemis or ESP32 sketch onto a given device. You should be able to see an 'OpenLog' device when scanning from your phone or computer. Next, open a web browser (Chome and Edge have been tested). 



Repository Contents
-------------------

* **/Firmware** - Artemis and ESP32 examples

License Information
-------------------

This product is _**open source**_!

Various bits of the code have different licenses applied. Anything SparkFun wrote is beerware; if you see me (or any other SparkFun employee) at the local, and you've found our code helpful, please buy us a round!

Please use, reuse, and modify these files as you see fit. Please maintain attribution to SparkFun Electronics and release anything derivative under the same license.

Distributed as-is; no warranty is given.

- Your friends at SparkFun.
