package main

import (
	"crypto/md5"
	"crypto/sha1"
	"crypto/sha256"
	"encoding/hex"
)

type hashes struct {
	SHA256 string
	SHA1   string
	MD5    string
}

func GenerateHASH(input string) hashes {
	return hashes{
		SHA256: generateSHA256(input),
		SHA1:   generateSHA1(input),
		MD5:    generateMD5(input),
	}
}

func generateSHA256(input string) string {
	hash := sha256.Sum256([]byte(input))
	return hex.EncodeToString(hash[:])
}

func generateSHA1(input string) string {
	hash := sha1.Sum([]byte(input))
	return hex.EncodeToString(hash[:])
}

func generateMD5(input string) string {
	hash := md5.Sum([]byte(input))
	return hex.EncodeToString(hash[:])
}
