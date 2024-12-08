import { Router } from "express";
import cityRoutes from "./routes/city.routes";
import carBrandRoutes from "./routes/carBrand.routes";
import carModelRoutes from "./routes/carModel.routes";
import clientRoutes from "./routes/client.routes";
import serviceOrderRoutes from "./routes/serviceOrder.routes";
import serviceOrdersLogRoutes from "./routes/serviceOrdersLog.routes";
import serviceStationRoutes from "./routes/serviceStation.routes";
import serviceSpecializationRoutes from "./routes/serviceSpecialization.routes";
import topServicesRoutes from "./routes/topServices.routes";
import carBrandServiceStatsRoutes from "./routes/carBrandServiceStats.routes";
import clientCarRoutes from "./routes/clientCar.routes";
import carModelPopularityRoutes from "./routes/carModelPopularity.routes";
import stationPerformanceRoutes from "./routes/stationPerformance.routes";
import carClientLogsRoutes from "./routes/carClientLogs.routes";

const router = Router();

router.use("/cities", cityRoutes);
router.use("/car-brands", carBrandRoutes);
router.use("/car-models", carModelRoutes);
router.use("/clients", clientRoutes);
router.use("/service-orders", serviceOrderRoutes);
router.use("/service-orders-log", serviceOrdersLogRoutes);
router.use("/service-stations", serviceStationRoutes);
router.use('/specializations', serviceSpecializationRoutes);
router.use('/top-services', topServicesRoutes);
router.use('/stats', carBrandServiceStatsRoutes);
router.use('/client-car', clientCarRoutes);
router.use('/car-logs', carClientLogsRoutes);
//
router.use('/popularity', carModelPopularityRoutes);
router.use('/performance', stationPerformanceRoutes);

export default router;
