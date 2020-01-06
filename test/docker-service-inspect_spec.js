var should = require("should");
var helper = require("node-red-node-test-helper");
var docker = require('dockerode-mock')


helper.init(require.resolve('node-red'));



describe('Inspect Service', function () {

    beforeEach(function (done) {
        helper.startServer(done);
    });

    afterEach(function (done) {
        helper.unload().then(function () {
            helper.stopServer(done);
        });
    });

    it('should be loaded', function (done) {
        var flow = [
            { id: "c1", type: "docker-config" },
            { id: "n1", type: "docker-service-inspect", config: "c1" }
        ];
        var dockerContainersNode = require("../dist/docker-service-inspect.js");
        var dockerConfigNode = require("../dist/docker-config.js");



        helper.load([dockerConfigNode, dockerContainersNode], flow, function () {
            var n1 = helper.getNode("n1");
            n1.should.have.property('type', 'docker-service-inspect');
            done();
        });
    });

   
});
