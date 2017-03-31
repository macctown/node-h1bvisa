var request = require('request');
var queryString = require('query-string');
var cheerio = require('cheerio'),
    cheerioTableparser = require('cheerio-tableparser');

const baseUrl = 'http://h1bdata.info/index.php?';

module.exports.findByTerms = function(company, userParams, callback){

    var params = {};
    params["em"] = company;
    params["title"] = userParams.title || "";
    params["city"] = userParams.userParamscity || "";
    params["year"] = userParams.year || "";

    const promise = new Promise(
        function(resolve, reject) {
            request(baseUrl + queryString.stringify(params), function (error, response, html) {
                if(error !== null || response === undefined || response.statusCode != 200) {
                    var errorBuilder = {
                        error: error !== null ? error : "",
                        responseError: response !== undefined ? response.statusCode : ""
                    };
                    reject(errorBuilder);
                }
                else {
                    var $ = cheerio.load(html);
                    cheerioTableparser($);
                    var dataGroupByCol = $("#myTable").parsetable(false, false, true);
                    var result = convertToRecords(dataGroupByCol);
                    resolve(result);
                }
            });
        }
    );

    if (typeof callback === 'function') {
        promise.then(
            function(res){
                callback(null, res)
            })
            .catch(callback);
        return null;
    }
    return promise;
};

module.exports.getInsights = function(records){

};

function convertToRecords(data){
    "use strict";
    var records = [];

    var rotateTable = data[0].map(function(col, i) {
        return data.map(function(row) {
            return row[i]
        })
    });

    rotateTable.map(function(row){
        var record = {};
        record.employer = row[0];
        record.title = row[1];
        record.salary = row[2];
        record.submitDate = row[3];
        record.startDate = row[4];
        record.caseStatus = row[5];
        records.push(record);
    });

    return records.slice(1);
}
