'use strict';
const VC = require("./lib");
const {Ed25519KeyPair} = require('crypto-ld');
const jsigs = require('jsonld-signatures');
const {encode, decode} = require('base58-universal');


const credential = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1"
  ],
  "id": "https://example.com/credentials/1872",
  "type": ["VerifiableCredential", "AlumniCredential"],
  "issuer": "https://example.edu/issuers/565049",
  "issuanceDate": "2010-01-01T19:23:24Z",
  "credentialSubject": {
    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
    "alumniOf": "Example University"
  }
};

(async function() {
  let keyPair = await Ed25519KeyPair.generate({
    id: 'https://example.edu/issuers/keys/1',
    controller: 'https://example.edu/issuers/565049'
  });

  let b = decode(keyPair.privateKeyBase58);
  // Load keypair here...

  console.log(b);
  console.log(keyPair);
  let suite = new jsigs.suites.Ed25519Signature2018({
    verificationMethod: 'https://example.edu/issuers/keys/1',
    key: keyPair
  });

  let r = await VC.issue({ credential, suite });
  console.log(JSON.stringify(r));
}());
