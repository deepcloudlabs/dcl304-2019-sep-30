class DashboardViewModel {
    constructor() {
        // domain related observables
        this.symbol = ko.observable("");
        this.isMonitoring = ko.observable(false);
        this.connected = ko.observable(false);
        this.windowSize = ko.observable(10);

        this.data = {
            labels: ko.observableArray([]),
            datasets: [
                {
                    label: ['BTCUSDT'],
                    backgroundColor: "rgba(220,220,220,0.2)",
                    borderColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: ko.observableArray([])
                }
            ]
        };
        this.connect();
        this.changeLng = this.changeLng.bind(this);
        this.i18n = this.i18n.bind(this);
        this.translate = this.translate.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.connect = this.connect.bind(this);
    }

    connect() {
        this.socket = io('ws://localhost:7001')
        this.connected(true);
        this.socket.on('trade', trade => {
            if (!this.isMonitoring()) return;
            this.data.datasets[0].data.push(trade.p);
            this.data.labels.push(trade.T);
            if (this.data.labels().length > this.windowSize()) {
                let size = this.data.labels().length - this.windowSize();
                console.log(size);
                let slicedLabels = this.data.labels().slice(size);
                this.data.labels(slicedLabels);
                let slicedData = this.data.datasets[0].data().slice(size);
                this.data.datasets[0].data(slicedData);
            }
        })
    }

    // i18n
    changeLng(lng) {
        i18n.setLng(lng, () => {
            this.i18n();
        });
    };

    i18n() {
        $(document).i18n();
    };

    translate(word) {
        return i18n.t(word);
    };

    // starts monitoring
    start() {
        this.isMonitoring(true);
        toastr.success(i18n.t("messageMonitoringStarted"), "", AppConfig.TOASTR_CONFIG);
    };

    // stops monitoring
    stop() {
        this.isMonitoring(false);
        toastr.warning(i18n.t("messageMonitoringStoped"), "", AppConfig.TOASTR_CONFIG);
    };

};

var dashBoardViewModel = new DashboardViewModel();

$(() => {
    i18n.init(AppConfig.I18N_CONFIG, (t) => {
        $(document).i18n();
        ko.applyBindings(dashBoardViewModel);
    });
});