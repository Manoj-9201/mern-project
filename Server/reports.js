const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
    {
        name: String,
        Product_type: String,
        profile: String,
        level: Number,
        architecture: Number,
        authentication: Number,
        sessionManagement: Number,
        accessControl: Number,
        inputValidation: Number,
        cryptography: Number,
        errorhandling: Number,
        dataProtection: Number,
        communication: Number,
        maliciousCode: Number,
        businessLogic: Number,
        files: Number,
        webServices: Number,
        configuration: Number
    },
    {
        collection: "Report",
    }
);

mongoose.model("Report", ReportSchema);