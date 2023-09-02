# PromosDigitales-back-getClient
````
(async () => {
  const res = await getClient({
    countryId: 'AR',
    cpgId: '001',
    organizationId: '3046',
    clientId: '0500000003'
  });
  console.log(res);
})();
````