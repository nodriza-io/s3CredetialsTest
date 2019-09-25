const AWS = require('aws-sdk')
const async = require('async')
const _ = require('lodash')
const colors = require('colors')
const manifest = require('./manifest.json')
const args = process.argv
const domain = args[2]
const project = _.get(manifest, 'projects.' + domain)

if (!project) {
	throw Error(`Error, cannot find project '${name}' in manifest, please "cp manifest.json.tmpl manifest.json" and replace credentials.`)
}

const credentials = {accessKeyId: project.accessKeyId, secretAccessKey: project.secretAccessKey, region: project.region}
const s3 = new AWS.S3(new AWS.Config(credentials))

const opt = {
	Bucket: project.bucket, 
	MaxKeys: 100
}
s3.listObjects(opt, (err, data) => {
	if (err) return console.error(err.message)
	console.log('->>> Listing:', JSON.stringify(data, null, 2))
})