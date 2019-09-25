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
const key = 'nodriza.txt'

console.log(`
	->>> Staring Nodriza S3 Credentials tests:
`.blue)

const tasks = {
	lsBucket: (callback) => {
		const opt = {
			Bucket: project.bucket, 
			MaxKeys: 1
		}
		s3.listObjects(opt, (err, data) => {
			if (err) return callback(err.message)
			console.log('1. listObjects OK!'.green)
			callback()
		})
	},
	putFile: (callback) => {
		const opt = {
			Bucket: project.bucket, 
			Key: key,
			Body: 'Hello World!'
		}
		s3.putObject(opt, (err, data) => {
			if (err) return callback(err.message)
			console.log('2. putObject OK!'.green)
			callback()
		})
	},
	headFile: (callback) => {
		const opt = {
			Bucket: project.bucket, 
			Key: key
		}
		s3.headObject(opt, (err, data) => {
			if (err) return callback(err.message)
			console.log('3. headObject OK!'.green)
			callback()
		})
	},
	getFile: (callback) => {
		const opt = {
			Bucket: project.bucket, 
			Key: key
		}
		s3.getObject(opt, (err, data) => {
			if (err) return callback(err.message)
			console.log('4. getObject OK!'.green)
			callback()
		})
	},
	delFile: (callback) => {
		const opt = {
			Bucket: project.bucket, 
			Key: key
		}
		s3.deleteObject(opt, (err, data) => {
			if (err) return callback(err.message)
			console.log('6. deleteObject OK!'.green)
			callback()
		})
	}
}

async.series(tasks, (err) => {
	if (err) return console.error(err.red)
console.log(`
	->>> Done: S3'${domain}' S3 Bucket Credentials are OK!
`.blue)
})

