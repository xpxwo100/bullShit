//
// Autogenerated by Thrift Compiler (0.9.3)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = module.exports = {};
LoginResponse = module.exports.LoginResponse = function(args) {
  this.code = null;
  this.msg = null;
  this.token = null;
  if (args) {
    if (args.code !== undefined && args.code !== null) {
      this.code = args.code;
    }
    if (args.msg !== undefined && args.msg !== null) {
      this.msg = args.msg;
    }
    if (args.token !== undefined && args.token !== null) {
      this.token = args.token;
    }
  }
};
LoginResponse.prototype = {};
LoginResponse.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.code = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.msg = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.token = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

LoginResponse.prototype.write = function(output) {
  output.writeStructBegin('LoginResponse');
  if (this.code !== null && this.code !== undefined) {
    output.writeFieldBegin('code', Thrift.Type.STRING, 1);
    output.writeString(this.code);
    output.writeFieldEnd();
  }
  if (this.msg !== null && this.msg !== undefined) {
    output.writeFieldBegin('msg', Thrift.Type.STRING, 2);
    output.writeString(this.msg);
    output.writeFieldEnd();
  }
  if (this.token !== null && this.token !== undefined) {
    output.writeFieldBegin('token', Thrift.Type.STRING, 3);
    output.writeString(this.token);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};
