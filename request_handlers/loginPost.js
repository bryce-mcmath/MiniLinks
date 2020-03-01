const bcrypt = require('../node_modules/bcrypt/bcrypt');

// Helper functions
const {
	getDatabase,
	updateDatabase,
	getUserByEmail,
	genVisitorId,
	getVisitorIndex
} = require('../helpers/helpers');

// ALERT NEEDED IN HERE
const loginPost = (req, res) => {
	try {
		const db = getDatabase();

		// Destructure info passed into post request
		const { email, password } = req.body;

		// Check if email is in the db, if it is return user id
		const id = getUserByEmail(email, db.users);

		// If there is an account associated with this email
		if (id) {
			// Get hashed pw from db
			const hash = db.users[id].password;

			// Verify correct pw
			bcrypt.compare(password, hash, (err, result) => {
				if (err) {
					console.log('Error: ', err);
					// 500: Internal server error
					res.status(500);
				} else {
					// if password correct
					if (result) {
						// Have a cookie!
						req.session.user_id = id;
						let index = getVisitorIndex(req.session.visitor_id, db.visitors);

						// if has a current visitor session
						if (index !== -1) {
							db.visitors[index].alerts.push({
								type: 'success',
								msg: 'Login successful! Welcome back.'
							});
							// if they dont have a current visitor session
						} else {
							const visitId = genVisitorId(db.visitors);
							req.session.visitor_id = visitId;
							db.visitors.push({
								id: visitId,
								visited_urls: {},
								alerts: [
									{ type: 'success', msg: 'Login successful! Welcome back.' }
								]
							});
						}
						index = getVisitorIndex(req.session.visitor_id, db.visitors);
						updateDatabase(db);
						res.redirect('/urls');

						// password incorrect
					} else {
						const index = getVisitorIndex(req.session.visitor_id, db.visitors);
						// if has a current visitor session
						if (index !== -1) {
							db.visitors[index].alerts.push({
								type: 'warning',
								msg: 'Incorrect email and password'
							});

							// no current visitor session
						} else {
							const id = genVisitorId(db.visitors);

							db.visitors.push({
								id,
								visited_urls: {},
								alerts: [
									{ type: 'warning', msg: 'Incorrect email and password' }
								]
							});

							req.session.visitor_id = id;
						}
						updateDatabase(db);
						// 400: Bad Request
						res.status(400);
						res.redirect('back');
					}
				}
			});
			// No accout associated with given email
		} else {
			// If they dont have a current visitor session
			if (!req.session.visitor_id) {
				const id = genVisitorId(db.visitors);
				db.visitors.push({
					id,
					visited_urls: {},
					alerts: [
						{ type: 'warning', msg: 'No account associated with that email' }
					]
				});
				req.session.visitor_id = id;
				// if they have a current visitor session
			} else {
				const index = getVisitorIndex(req.session.visitor_id, db.visitors);
				db.visitors[index].alerts.push({
					type: 'warning',
					msg: 'No account associated with that email'
				});
			}
			updateDatabase(db);
			// 400: Bad Request
			res.status(400);
			res.redirect('back');
		}
	} catch (error) {
		console.log('Error: ', error);
		res.status(500);
		res.redirect('back');
	}
};

module.exports = loginPost;
