class BLEService {
    test = 'this is a test';

    constructor() {}

    testFunction() {
        let date = new Date();
        return date.getFullYear() - this.year;
    }

}

var requestBlueToothDevices = function() {

    let testService = new BLEService();
    console.log(testService.test);
    testService.testFunction();

    let options = {
        optionalServices: [ 0xff00 ]
    };
    options.acceptAllDevices = true;

    
    return navigator.bluetooth.requestDevice(options).then(device => {
        
        return device.gatt.connect().then(gattServer => {
            console.log(gattServer);
            
            // OLA Standard BLE Service
            gattServer.getPrimaryService(0xff00).then(primaryService => {
                console.log(primaryService);

                /**
                 * Battery Level
                 */
                primaryService.getCharacteristic(0xff01).then(characteristic => {
                    console.log(characteristic);
                    characteristic.readValue().then(value => {
                        let batteryLevel = new Int8Array(value.buffer)[0];
                        console.log(batteryLevel);
                        $(function () {
                            $('[data-toggle="tooltip"]').tooltip()
                        });
                    });
                });

                /**
                 * LED Toggle
                 */
                primaryService.getCharacteristic(0xff0d).then(characteristic => {
                    console.log(characteristic);
                    characteristic.readValue().then(value => {
                        console.log(characteristic);
                        let ledReading = new Int8Array(value.buffer)[0];
                        if (ledReading) {
                            //this.ledStatusReadingEvent.emit(ledReading);
                        }
                    });
                });

                /**
                 * Acc Readings
                 */
                primaryService.getCharacteristic(0xff02).then(characteristic => {
                    console.log(characteristic);
                    characteristic.readValue().then(value => {
                        console.log(characteristic);
                        let accX = new Int8Array(value.buffer)[0];
                        // if (accX) {
                        //     this.accXReadingEvent.emit(accX);
                        // }
                        characteristic.startNotifications().then(accX => {
                            console.log('accX Notifications started');
                            characteristic.addEventListener('characteristicvaluechanged', (value) => {
                                console.log('accX', value);
                                //this.accXReadingEvent.emit(value);
                            });
                        });
                    });
                });

                primaryService.getCharacteristic(0xff03).then(characteristic => {
                    console.log(characteristic);
                    characteristic.readValue().then(value => {
                        console.log(characteristic);
                        let accY = new Int8Array(value.buffer)[0];
                        if (accY) {
                            //this.accYReadingEvent.emit(accY);
                        }
                    });
                    characteristic.startNotifications().then(accY => {
                        console.log('accY Notifications started');
                        characteristic.addEventListener('characteristicvaluechanged', (value) => {
                            console.log('accY', value);
                            //this.accYReadingEvent.emit(value);
                        });
                    });
                });

                primaryService.getCharacteristic(0xff04).then(characteristic => {
                    console.log(characteristic);
                    //this.accZCharacteristic = characteristic;
                    characteristic.readValue().then(value => {
                        console.log(characteristic);
                        let accZ = new Int8Array(value.buffer)[0];
                        if (accZ) {
                            //this.accZReadingEvent.emit(accZ);
                        }
                    });
                    characteristic.startNotifications().then(accZ => {
                        console.log('accZ Notifications started');
                        characteristic.addEventListener('characteristicvaluechanged', (value) => {
                            console.log('accZ', value);
                            //this.accZReadingEvent.emit(value);
                        });
                    });
                });

                primaryService.getCharacteristic(0xff05).then(characteristic => {
                    console.log(characteristic);
                    //this.accTCharacteristic = characteristic;
                    characteristic.readValue().then(value => {
                        console.log(characteristic);
                        let accT = new Int8Array(value.buffer)[0];
                        if (accT) {
                            //this.accTReadingEvent.emit(accT);
                        }
                    });
                    characteristic.startNotifications().then(accT => {
                        console.log('accT Notifications started');
                        characteristic.addEventListener('characteristicvaluechanged', (value) => {
                            console.log('accT', value);
                            //this.accTReadingEvent.emit(value);
                        });
                    });
                });
            });
        });
    }).catch(error => {
        console.log(error);
    });
}

$(document).ready(function() {

    $('.connect-button').on('click', () => {
        requestBlueToothDevices().then(result => {
            console.log('all done');
        });
    });

});