const Account = require('../models/Account');
const Account_Patient = require('../models/AccountPatient');
const Account_Doctor = require('../models/AccountDoctor');
const { mutileMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class AccountController {
    //[GET] /account/:slug
    accounts(req, res, next) {
        Account_Doctor.find({})
            .then((accounts) => {
                res.render('accounts', {
                    accounts: mutileMongooseToObject(accounts),
                });
            })
            .catch(next);
    }

    show(req, res, next) {
            Account.findOne({ slug: req.params.slug })
                .then((account) => {
                    res.render('accounts/show', {
                        account: mongooseToObject(account),
                    });
                })
                .catch(next);
        }
        //[GET] accounts/create
    create(req, res, next) {
            res.render('accounts/create');
        }
        //[POST] accounts/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.video}/sddefault.jpg`
        const account = new Account(req.body);
        account
            .save()
            .then(() => res.redirect('/accounts'))
            .catch((error) => {});
    }
    edit(req, res, next) {
        Account.findById(req.params.id, (err, account) => {
                if (account.RoleName == 'patient') {
                    res.render('accounts/edit', { accountPatient: mongooseToObject(account) })
                } else {
                    res.render('accounts/edit', { accountDoctor: mongooseToObject(account) })
                }
            })
            // .then((account) =>
            //     res.render('accounts/edit', { account: mongooseToObject(account) })
            // )
            // .catch(next);
    }

    //[PUT] accounts/:id
    async update(req, res, next) {
            if (req.body.RoleName == 'doctor') {
                const data = await Account_Patient.findOneAndDelete({ Id: req.body.Id });
            }
            await Account.updateOne({ Id: req.body.Id }, req.body)
                .then(() => res.redirect('/me/stored/accounts'))
                .catch(next);
        }
        //[DELETE] accounts/:id
    destroy(req, res, next) {
            Account.delete({ _id: req.params.id })
                .then(() => res.redirect('back'))
                .catch(next);
        }
        //[DELETE] accounts/:id/xoa-that
    destroyThat(req, res, next) {
        Account.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATCH] accounts/:id/restore
    restore(req, res, next) {
            Account.restore({ _id: req.params.id })
                .then(() => res.redirect('back'))
                .catch(next);
        }
        //[POST]
    handFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Account.delete({ _id: { $in: req.body.accountIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ mesage: 'hanh dong khong hop le' })
        }
    }
}

module.exports = new AccountController();