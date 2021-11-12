const TaskModel = require('../model/TaskModel');
const current = new Date();  //saber qual é a data e a hora atual
const {startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth,endOfMonth, startOfYear,endOfYear} = require('date-fns'); //saber sobre o dia, semana,mes,e ano


class TaskController{

    async create(req, res){  //cadastrar
        const task = new TaskModel(req.body);
        await task
        .save()
        .then(response => {
            return res.status(200).json(response);  //caso dê certo
        })
        .catch(error=> {
            return res.status(500).json(error);  //caso dê errado
        }); 

    }

    async update(req,res){ //atualizar
        await TaskModel.findByIdAndUpdate({'_id':req.params.id}, req.body, {new: true}) //recuperando o valor do id passado pela url
        .then(response=>{
            return res.status(200).json(response); //caso dê certo
        })
        .catch(error=>{
            return res.status(500).json(error); //caso dê errado
        }) 

    }

    async all(req,res){ //listar tarefas
        await TaskModel.find( {macaddress: {'$in':req.params.macaddress}} )  //listar baseado no filtro escolhido, no caso foi o macaddress
        .sort('when') // trazer organizado por data e hora
        .then(response=>{ //caso dê certo
            return res.status(200).json(response);
        })
        .catch(error=>{
            return res.status(500).json(error) //caso dê errado
        })
    }

    async show(req, res){ //exibir apenas uma tarefa
        await TaskModel.findById(req.params.id)
        .then(response=>{
            if(response){ //se a tarefa existir
                return res.status(200).json(response); 
            }         
            else{
                return res.status(404).json({error:'tarefa não encontrada'});
            }     
        })
        .catch(error=>{
            return res.status(500).json(error);
        });
    }

    async delete(req,res){ //deletar 
        await TaskModel.deleteOne({'_id': req.params.id})
        .then(response=>{
            return res.status(200).json(response);
        })
        .catch(error=>{
            return res.status(200).json(error);
        })

    }

    async done(req,res){ //atualizar o status da tarefa, se esta concluida ou não
        await TaskModel.findByIdAndUpdate( //buscar a tarefa pelo id
            {'_id':req.params.id}, 
            {'done':req.params.done},
            {'new': true})
            .then(response=>{
                return res.status(200).json(response);
            })
            .catch(error=>{
                return res.status(500).json(error);
            });

    }

    async late(req,res){ //exibir tarefas atrasadas
        await TaskModel
        .find({
            'when':{'$lt': current},
            'macaddress': {'$in': req.params.macaddress}
    })
    .sort('when')//ordenada por data e hora
    .then(response =>{
        return res.status(200).json(response);
    })
    .catch(error=>{
        return res.status(500).json(error);
    })

    }

    async today(req,res){  //exibir as tarefas do dia
        await TaskModel
        .find({ 
             'macaddress': {'$in': req.params.macaddress},
             'when': {'$gte':startOfDay(current), '$lte': endOfDay(current)}
            })
        .sort('when')
        .then(response=>{
            return res.status(200).json(response);
        })
        .catch(error=>{
            return res.status(500).json(error);
        })
    }

    async week(req,res){  //exibir as tarefas da semana
        await TaskModel
        .find({ 
             'macaddress': {'$in': req.params.macaddress},
             'when': {'$gte': startOfWeek(current), '$lte': endOfWeek(current)}
            })
        .sort('when')
        .then(response=>{
            return res.status(200).json(response);
        })
        .catch(error=>{
            return res.status(500).json(error);
        })
    }

    async month(req,res){  //exibir as tarefas do mês
        await TaskModel
        .find({ 
             'macaddress': {'$in': req.params.macaddress},
             'when': {'$gte': startOfMonth(current), '$lte': endOfMonth(current)}
            })
        .sort('when')
        .then(response=>{
            return res.status(200).json(response);
        })
        .catch(error=>{
            return res.status(500).json(error);
        })
    }

    async year(req,res){  //exibir as tarefas do ano
        await TaskModel
        .find({ 
             'macaddress': {'$in': req.params.macaddress},
             'when': {'$gte': startOfYear(current), '$lte': endOfYear(current)}
            })
        .sort('when')
        .then(response=>{
            return res.status(200).json(response);
        })
        .catch(error=>{
            return res.status(500).json(error);
        })
    }
   
}



module.exports = new TaskController();