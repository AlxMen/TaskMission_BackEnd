import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { TaskController } from "../controllers/TaskController";
import { TeamMemberController } from "../controllers/TeamController";
import { handleInputErrors } from "../middleware/validation";
import { projectExists } from "../middleware/project";
import {
  hasAuthorization,
  taskBelongsToProject,
  taskExists,
} from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { NoteController } from "../controllers/NoteController";

const router = Router();

router.use(authenticate);

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

// Rutas para Tareas
router.param("projectId", projectExists);

router.put(
  "/:projectId",
  param("projectId").isMongoId().withMessage("ID no valido"),
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
  hasAuthorization,
  ProjectController.updateProject
);

router.delete(
  "/:projectId",
  param("projectId").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  hasAuthorization,
  ProjectController.deleteProject
);

router.post(
  "/:projectId/tasks",
  hasAuthorization,
  body("name").notEmpty().withMessage("El nombre de la tarea es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripcion de la tarea es Obligatoria"),
  handleInputErrors,
  TaskController.createTask
);

router.get("/:projectId/tasks", TaskController.getProyectTasks);

router.param("taskId", taskExists);
router.param("taskId", taskBelongsToProject);

router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  TaskController.getTaskById
);

router.put(
  "/:projectId/tasks/:taskId",
  hasAuthorization,
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
  hasAuthorization,
  param("taskId").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  TaskController.deleteTask
);

router.post(
  "/:projectId/tasks/:taskId/status",
  param("taskId").isMongoId().withMessage("ID no valido"),
  body("status").notEmpty().withMessage("El estado es obligatorio"),
  handleInputErrors,
  TaskController.updateStatus
);

/** Routes for teams */
router.post(
  "/:projectId/team/find",
  body("email").isEmail().toLowerCase().withMessage("E-mail no valido"),
  handleInputErrors,
  TeamMemberController.findMemberByEmail
);

router.get("/:projectId/team", TeamMemberController.getProjectTeam);

router.post(
  "/:projectId/team",
  body("id").isMongoId().withMessage("ID No valido"),
  handleInputErrors,
  TeamMemberController.addMenberById
);

router.delete(
  "/:projectId/team/:userId",
  param("userId").isMongoId().withMessage("ID No valido"),
  handleInputErrors,
  TeamMemberController.removeMemberById
);

/** Routes for Notes */
router.post(
  "/:projectId/tasks/:taskId/notes",
  body("content")
    .notEmpty()
    .withMessage("El Contenido de el comentario o nota es obligatorio"),
  handleInputErrors,
  NoteController.createNote
);

router.get("/:projectId/tasks/:taskId/notes",
  NoteController.getTaskNotes
);

router.delete("/:projectId/tasks/:taskId/notes/:noteId",
  param('noteId').isMongoId().withMessage('ID No Valido'),
  handleInputErrors,
  NoteController.deleteNote
);

export default router;
