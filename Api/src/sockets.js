const { userJoin, getGameUsers, leaveRoom } = require("./utilsSockets/rooms");
const { joinChat, leaveChat, getUser } = require("./utilsSockets/chats.js");

module.exports = (io) => {
	io.on("connection", (socket) => {
		//rooms
		socket.on("joinRoom", (user) => {
			if (user.username) {
				let userFull = { ...user, socketid: socket.id };
				global[socket.id] = userFull;
				userJoin(userFull);
				socket.join(userFull.game);
				io.to(userFull.game).emit("gameUsers", getGameUsers(userFull.game));
			}
		});

		//sendUsers
		socket.on("getGameUsers", (user) => {
			io.to(socket.id).emit("gameUsers", getGameUsers(user.game));
		});

		socket.on("leaveRoom", (user) => {
			try {
				if (user.username) {
					leaveRoom(user.game, user._id);
					io.to(user.game).emit("gameUsers", getGameUsers(user.game));
				}
			} catch (e) {
				console.log(e.message);
			}
		});

		//invitations
		socket.on("client: invitation", (invitation) => {
			let newInvitation = { ...invitation.user };
			newInvitation.socketid = socket.id;
			socket.to(invitation.to).emit("server: invitation", newInvitation);
		});

		socket.on("client: invitationAccepted", (invitationAccepted) => {
			let socketid = invitationAccepted.userThatInvited.socketid;
			socket.broadcast
				.to(socketid)
				.emit("server: invitationAccepted", invitationAccepted);
		});

		socket.on("client: invitationDeclined", (invitationDeclined) => {
			socket
				.to(invitationDeclined.userThatInvited.socketid)
				.emit("server: invitationDeclined", invitationDeclined);
		});

		socket.on("client: erasePreviousNotifications", (user) => {
			socket.broadcast.emit("server: erasePreviousNotifications", user);
		});

		//chats
		socket.on("joinChat", (user) => {
			let userFull = { ...user, socketid: socket.id };
			global[socket.id] = userFull;
			joinChat(userFull);
		});

		socket.on("client: send message", (msg) => {
			let receiver = getUser(msg.users[1]);
			if (receiver) {
				socket.to(receiver.socketid).emit("server: received message", msg);
			}
		});

		//

		socket.on("disconnect", () => {
			try {
				// rooms
				if (global[socket.id]) {
					if (global[socket.id].game) {
						leaveRoom(global[socket.id].game, global[socket.id]._id);
						io.to(global[socket.id].game).emit(
							"gameUsers",
							getGameUsers(global[socket.id].game)
						);
					}

					//notifications
					socket.broadcast.emit(
						"server: erasePreviousNotifications",
						global[socket.id]._id
					);
					io.emit("server: erasePreviousNotifications", global[socket.id]);

					//chat
					leaveChat(global[socket.id]._id);
					global[socket.id] = null;
					delete global[socket.id];
				}
			} catch (e) {
				console.log(e.message);
			}
		});
	});
};
