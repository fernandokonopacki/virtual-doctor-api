
module.exports = app =>{
    app.get('/health', (req, res) => {
        console.log("[server]: Health check request");
        res.status(200);
        res.send({
            message: "server up"
        })
    });
}