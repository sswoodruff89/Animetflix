json.extract! profile, :name, :id, :user_id, :profile_num
json.showcase_idx rand(Program.count + 1);