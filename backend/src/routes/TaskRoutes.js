const { endOfQuarter } = require('date-fns');
const express = require('express');
const { update } = require('../controller/TaskController');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');

router.post('/',TaskValidation, TaskController.create); //rota para cadastrar
router.put('/:id',TaskValidation,TaskController.update);               //rota para atualizar
router.get('/filter/all/:macaddress', TaskController.all);          //rota para listar
router.get('/:id',TaskController.show);                 //rota para mostrar uma tarefa especifica
router.delete('/:id',TaskController.delete)             //rota para deletar
router.put('/:id/:done',TaskController.done);           //rota para atualizar o estado da tarefa
router.get('/filter/late/:macaddress',TaskController.late);         //rota para exibir as tarefas atrasadas
router.get('/filter/today/:macaddress',TaskController.today);       // ROTA PARA mostrar as tarefas do dia
router.get('/filter/week/:macaddress',TaskController.week);       // ROTA PARA mostrar as tarefas da semana
router.get('/filter/month/:macaddress',TaskController.month);       // ROTA PARA mostrar as tarefas do mês
router.get('/filter/year/:macaddress',TaskController.year);       // ROTA PARA mostrar as tarefas do ano



module.exports = router;