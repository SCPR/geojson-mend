# geojson-precision
This is a fork of [jczaplew/geojson-precision](https://github.com/jczaplew/geojson-precision). This fork was created to extend the module to include more features that fulfill our particular needs. Please use [jczaplew](https://github.com/jczaplew)'s module if this isn't the right module for you. 


## What does this plugin do?
Removes unnecessary precision from different types of GeoJSON object. Remember the following table to decide on what precision to use for your projects.

````
decimal
places   degrees          distance
-------  -------          --------
0        1                111  km
1        0.1              11.1 km
2        0.01             1.11 km
3        0.001            111  m
4        0.0001           11.1 m
5        0.00001          1.11 m
6        0.000001         11.1 cm
7        0.0000001        1.11 cm
8        0.00000001       1.11 mm
````

## Future plans
Add features to simplify GeoJSON Object. Not always you need an extremely detailed map. Sometimes it is a lot more efficient to just reduce your geo geometry.


## Install
````
npm install [-g] geojson-mend
````


## API


###.parse(*geojson*, *precision*)

````geojson```` is a valid GeoJSON object, and can be of type ````Point````, ````LineString````, ````Polygon````, ````MultiPoint````, ````MultiPolygon````, ````MultiLineString````, ````GeometryCollection````, ````Feature````, or ````FeatureCollection````.

````precision```` is a positive integer. If your specified ````precision```` value is greater than the precision of the input geometry, the output precision will be the same as the input. For example, if your input coordinates are ````[10.0, 20.0]````, and you specify a ````precision```` of ````5````, the output will be the same as the input. 

 
##### Example use:

````
var geomend = require("geojson-mend");

var trimmed = geomend.parse({
        "type": "Point",
        "coordinates": [
          18.984375,
          57.32652122521709
        ]
      }, 3);

````

````trimmed```` will now look like this:

````
{
    "type": "Point",
    "coordinates": [
       18.984,
       57.326
    ]
}
````

 ````.parse()```` can also be used directly, for example:
 
 ````
var geomend = require("geojson-precision");

var trimmed = geomend({ ... }, 3);

````


## License
CC0
Original author: [jczaplew/geojson-precision](https://github.com/jczaplew/geojson-precision)