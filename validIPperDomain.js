/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/

/* 
DESCRIPTION: maintains a table of email domains and the valid IP's their users can access from
*/

const extractDomain = require("extract-domain");

exports.onExecutePostLogin = async (event, api) => {
    //List of domains and valid ips. Can be modified to include a range instead of individual IPs
    const domainsIPsMappings = [{
        domain: "bankoftomasthegreat.com",
        ips: ["127.0.0.1", "127.0.0.2"]
    },
    {
        domain: "otherofmanygreattomasbanks.com",
        ips: ["127.0.0.3", "127.0.0.4"]
    }]

    //Extract the domain from the user logging in
    const emailDomain = extractDomain(event.user.email)
    const mapping = domainsIPsMappings.find(element => element.domain.toLowerCase() == emailDomain);

    if(mapping){
      const isValidIP = mapping.ips.find(ip => ip==event.request.ip) || {}
      if(!isValidIP)
        api.access.deny("IP NOT ALLOWED")
    }
}

/**
* Handler that will be invoked when this action is resuming after an external redirect. If your
* onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
// exports.onContinuePostLogin = async (event, api) => {
// };
