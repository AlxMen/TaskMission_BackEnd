import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";

const router = Router();

// Rutas para Proyectos
router.post(
  "/",
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del Proyecto es Obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del Cliente es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripcion del Proyecto es Obligatoria"),
  handleInputErrors,
  ProjectController.createProject
);
router.get("/", ProjectController.getAllProjects);
router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  ProjectController.getProjectById
);
router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID no valido"),
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del Proyecto es Obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del Cliente es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripcion del Proyecto es Obligatoria"),
  handleInputErrors,
  ProjectController.updateProject
);
router.delete(
  "/:id",
  param("id").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  ProjectController.deleteProject
);

// Rutas para Tareas
router.param("projectId", validateProjectExists);

router.post(
  "/:projectId/tasks",
  body("name").notEmpty().withMessage("El nombre de la tarea es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripcion de la tarea es Obligatoria"),
  handleInputErrors,
  TaskController.createTask
);

router.get("/:projectId/tasks", TaskController.getProyectTasks);

router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  TaskController.getTaskById
);

router.put(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("ID no valido"),
  body("name").notEmpty().withMessage("El nombre de la tarea es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripcion de la tarea es Obligatoria"),
  handleInputErrors,
  TaskController.updateTask
);

router.delete(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  TaskController.deleteTask
);

export default router;
