// pages/combine/combine.js
const app = getApp();
Page({
  data: {},

  onLoad: function(options) {
    wx.getImageInfo({
      src: app.globalData.bgPic,
      success: res => {
        this.bgPic = res.path;
        this.draw();
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  draw() {
    let scale = app.globalData.scale;
    let rotate = app.globalData.rotate;
    let hat_center_x = app.globalData.hat_center_x;
    let hat_center_y = app.globalData.hat_center_y;
    let currentHatId = app.globalData.currentHatId2;
    let currentHatId1 = app.globalData.currentHatId1;
    const pc = wx.createCanvasContext("myCanvas");
    const hat_size = 100 * scale;

    pc.clearRect(0, 0, 300, 300);
    pc.drawImage(this.bgPic, 0, 0, 300, 300);
    pc.drawImage("../../image/" +currentHatId1 + ".png", 0, 0, 300, 300);
    pc.translate(hat_center_x, hat_center_y);
    pc.rotate((rotate * Math.PI) / 180);
    pc.drawImage("../../image/" +currentHatId + ".png",-hat_size / 2,-hat_size / 2,hat_size,hat_size);
    // pc.translate(-hat_center_x, -hat_center_y);

     pc.draw();
  },
  savePic() {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      height: 300,
      width: 300,
      canvasId: "myCanvas",
      success: res => {
        app.globalData.successPic = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: res => {
            wx.navigateTo({
              url: "../share/share",
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {}
            });
            // console.log("success:" + res);
          },
          fail(e) {
            console.log("err:" + e);
          }
        });
      }
    });
  },
  introduction(){
    wx.navigateTo({
      url: "../introduction/introduction"
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    let successPic = app.globalData.successPic
      ? app.globalData.successPic
      // : "https://i1.xpic.jp/file/xpicjp/2021/05/25/66a68b7f0c9a5cb7fe5f1f8df13c12a2.jpg";
      : "https://i1.xpic.jp/file/xpicjp/2021/05/28/8ea0467b188b37f19b4ae61788247dcf.jpg";
    return {
      title: "一起来做SCUer吧！",
      imageUrl: successPic,
      path: "/pages/index/index",
      success: function(res) {}
    };
  }
});
