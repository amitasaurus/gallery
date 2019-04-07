app.controller('galleryCtrl', function($scope) {
    console.log('galleryCtrl');
    $scope.images = new Array(24);

    $scope.filterCtrl = new function() {
        this.isActive = false;
        this.display = () => {
            this.isActive = true;
        }
        this.hide = (hide) => {
            this.isActive = false;
        }
        this.update = (tag) => {
        	console.log(tag);
        	this.hide();
        }
    }
})