const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId; 

const getAllContacts = async (req, res) => {
    //#swagger.tags=['Contacts']
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.status(200).json(contacts);
    });
}

const getContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: userId});
    result.toArray().then((contacts) => {
        res.status(200).json(contacts[0]);
    });
}

const createContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    };
    console.log(newContact)
    console.log(req.body.favoriteColor)
    console.log(req.body.firstName)
    const contacts = mongodb.getDatabase().db().collection('contacts')
    contacts.insertOne(newContact).then(result => {
        console.log(result)
      })
      .catch(error => console.error(error))
}

const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const userId = new ObjectId(req.params.id);
    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    };
    const contacts = mongodb.getDatabase().db().collection('contacts');
    contacts.findOneAndUpdate(
        { _id: userId},
        {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                favoriteColor: req.body.favoriteColor,
                birthday: req.body.birthday,
            },
        },
        {
            upsert: true,
        }
    )
    .then(result => {
        console.log(result);
    })
    .catch(error => console.error(error));
}

const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const userId = new ObjectId(req.params.id);
    const contacts = mongodb.getDatabase().db().collection('contacts');
    contacts.deleteOne({_id: userId})
        .then(result => {
            res.json(`Contact Deleted`);
        })
        .catch(error => console.error(error));
}

module.exports = {
    getAllContacts, 
    getContact,
    createContact,
    updateContact,
    deleteContact,
};