var geojson = require('geojson-validation');
var simplify = require('simplify-geometry');

(function () {

    function isGeoJSON(data) {
        var validGeoJSON = 0;
        if (!geojson.valid(data)) {
            validGeoJSON = 0;
        } else {
            if (!/^[0-9,\.\+\- \[\]\"\']+$/.test(JSON.stringify(data.coordinates))) {
                validGeoJSON = 0;
            } else {
                validGeoJSON = 1;
            }
        }
        return validGeoJSON;
    }

    function nDecimals(t, precision) {

        if (isGeoJSON(t)) {

            function point(p) {
                return p.map(function (e) {
                    return 1 * parseFloat(e).toFixed(precision);
                });
            }

            function multi(l) {
                return l.map(point);
            }

            function poly(p) {
                return p.map(multi);
            }

            function multiPoly(m) {
                return m.map(poly);
            }

            function geometry(obj) {
                if (!obj) {
                    return {};
                }

                switch (obj.type) {
                    case "Point":
                        obj.coordinates = point(obj.coordinates);
                        return obj;
                    case "LineString":
                    case "MultiPoint":
                        obj.coordinates = multi(obj.coordinates);
                        return obj;
                    case "Polygon":
                    case "MultiLineString":
                        obj.coordinates = poly(obj.coordinates);
                        return obj;
                    case "MultiPolygon":
                        obj.coordinates = multiPoly(obj.coordinates);
                        return obj;
                    case "GeometryCollection":
                        obj.geometries = obj.geometries.map(geometry);
                        return obj;
                    default:
                        return obj;
                }
            }

            function feature(obj) {
                obj.geometry = geometry(obj.geometry);
                return obj
            }

            function featureCollection(f) {
                f.features = f.features.map(feature);
                return f;
            }

            function geometryCollection(g) {
                g.geometries = g.geometries.map(geometry);
                return g;
            }

            if (!t) {
                return t;
            }

            switch (t.type) {
                case "Feature":
                    return feature(t);
                case "GeometryCollection":
                    return geometryCollection(t);
                case "FeatureCollection":
                    return featureCollection(t);
                case "Point":
                case "LineString":
                case "Polygon":
                case "MultiPoint":
                case "MultiPolygon":
                case "MultiLineString":
                    return geometry(t);
                default:
                    return t;
            }

        } else {
            return t;
        }


    }

    function nReduce(t, tolerance) {

        if (isGeoJSON(t)) {

            function multi(l) {
                return simplify(l, tolerance);
            }

            function poly(p) {
                return p.map(multi);
            }

            function multiPoly(m) {
                return m.map(poly);
            }

            function geometry(obj) {
                if (!obj) {
                    return {};
                }

                switch (obj.type) {
                    case "LineString":
                    case "MultiPoint":
                        obj.coordinates = multi(obj.coordinates);
                        return obj;
                    case "Polygon":
                    case "MultiLineString":
                        obj.coordinates = poly(obj.coordinates);
                        return obj;
                    case "MultiPolygon":
                        obj.coordinates = multiPoly(obj.coordinates);
                        return obj;
                    case "GeometryCollection":
                        obj.geometries = obj.geometries.map(geometry);
                        return obj;
                    default:
                        return obj;
                }
            }

            function feature(obj) {
                obj.geometry = geometry(obj.geometry);
                return obj
            }

            function featureCollection(f) {
                f.features = f.features.map(feature);
                return f;
            }

            function geometryCollection(g) {
                g.geometries = g.geometries.map(geometry);
                return g;
            }

            if (!t) {
                return t;
            }

            switch (t.type) {
                case "Feature":
                    return feature(t);
                case "GeometryCollection":
                    return geometryCollection(t);
                case "FeatureCollection":
                    return featureCollection(t);
                case "Point":
                case "LineString":
                case "Polygon":
                case "MultiPoint":
                case "MultiPolygon":
                case "MultiLineString":
                    return geometry(t);
                default:
                    return t;
            }

        } else {
            return t;
        }


    }

    module.exports.nDecimals = nDecimals;
    module.exports.nReduce = nReduce;

} ());